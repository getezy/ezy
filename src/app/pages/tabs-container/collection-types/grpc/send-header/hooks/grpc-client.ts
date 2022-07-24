import { nanoid } from 'nanoid';

import { GrpcClientRequestOptions } from '../../../../../../../core/clients/grpc-client/interfaces';
import { GrpcMethodType, GrpcOptions } from '../../../../../../../core/protobuf/interfaces';
import {
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
} from '../../../../../../storage';

export function useGrpcClient() {
  const collections = useCollectionsStore((store) => store.collections);
  const { updateGrpcTabData, addGrpcStreamMessage } = useTabsStore((store) => store);

  function getOptions(tab: GrpcTab<GrpcMethodType>): [GrpcOptions, GrpcClientRequestOptions] {
    const collection = collections.find((item) => item.id === tab.info.collectionId);
    const service = collection?.children?.find((item) => item.id === tab.info.serviceId);
    const method = service?.methods?.find((item) => item.id === tab.info.methodId);

    if (collection && service && method && tab.data.url) {
      return [
        collection.options,
        { serviceName: service.name, methodName: method.name, address: tab.data.url },
      ];
    }

    throw new Error(`Couldn't get request options. Try to sync collection.`);
  }

  async function invoke(
    tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>,
    onEnd: () => void
  ): Promise<string> {
    const [grpcOptions, requestOptions] = getOptions(tab);

    updateGrpcTabData(tab.id, {
      response: {
        ...tab.data.response,
        messages: [
          {
            id: nanoid(),
            type: GrpcStreamMessageType.STARTED,
          },
        ],
      },
    });

    const id = await window.clients.grpc.serverStreaming.invoke(
      grpcOptions,
      requestOptions,
      JSON.parse(tab.data.requestTabs.request.value || '{}'),
      JSON.parse(tab.data.requestTabs.metadata.value || '{}'),
      (data) => {
        const message = {
          id: nanoid(),
          type: GrpcStreamMessageType.SERVER_MESSAGE,
          value: JSON.stringify(data, null, 2),
        };

        addGrpcStreamMessage(tab.id, message);
      },
      (error) => {
        const message = {
          id: nanoid(),
          type: GrpcStreamMessageType.ERROR,
          value: JSON.stringify(error, null, 2),
        };

        addGrpcStreamMessage(tab.id, message);
      },
      () => {
        const message = {
          id: nanoid(),
          type: GrpcStreamMessageType.ENDED,
        };

        addGrpcStreamMessage(tab.id, message);

        onEnd();
      }
    );

    return id;
  }

  function cancel(id: string): Promise<void> {
    return window.clients.grpc.serverStreaming.cancel(id);
  }

  return { invoke, cancel };
}
