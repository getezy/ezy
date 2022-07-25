import { nanoid } from 'nanoid';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import {
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
} from '../../../../../storage';
import { getOptions, parseMetadata } from './prepare-request';

export function useClientStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { updateGrpcTabData, addGrpcStreamMessage } = useTabsStore((store) => store);

  async function invoke(
    tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>,
    onEnd: () => void
  ): Promise<string> {
    const [grpcOptions, requestOptions] = getOptions(collections, tab);
    const metadata = parseMetadata(tab);

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

    const id = await window.clients.grpc.clientStreaming.invoke(
      grpcOptions,
      requestOptions,
      metadata,
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
          value: error.message,
        };

        addGrpcStreamMessage(tab.id, message);

        onEnd();
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
    return window.clients.grpc.clientStreaming.cancel(id);
  }

  return { invoke, cancel };
}
