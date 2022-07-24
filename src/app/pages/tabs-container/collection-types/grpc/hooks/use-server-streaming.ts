import { nanoid } from 'nanoid';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import {
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
} from '../../../../../storage';
import { getOptions } from './prepare-request';

export function useServerStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { updateGrpcTabData, addGrpcStreamMessage } = useTabsStore((store) => store);

  async function invoke(
    tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>,
    onEnd: () => void
  ): Promise<string> {
    const [grpcOptions, requestOptions] = getOptions(collections, tab);

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
          type: GrpcStreamMessageType.CANCELED,
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
