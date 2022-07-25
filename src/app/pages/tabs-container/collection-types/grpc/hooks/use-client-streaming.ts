import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import {
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
} from '../../../../../storage';
import { getOptions, parseMetadata, parseRequest } from './prepare-request';

export function useClientStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { addGrpcStreamMessage } = useTabsStore((store) => store);

  async function invoke(
    tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>,
    onEnd: () => void
  ): Promise<string> {
    const [grpcOptions, requestOptions] = getOptions(collections, tab);
    const metadata = parseMetadata(tab);

    addGrpcStreamMessage(
      tab.id,
      {
        type: GrpcStreamMessageType.STARTED,
      },
      true
    );

    const id = await window.clients.grpc.clientStreaming.invoke(
      grpcOptions,
      requestOptions,
      metadata,
      (data) => {
        addGrpcStreamMessage(tab.id, {
          type: GrpcStreamMessageType.SERVER_MESSAGE,
          value: JSON.stringify(data, null, 2),
        });
      },
      (error) => {
        addGrpcStreamMessage(tab.id, {
          type: GrpcStreamMessageType.ERROR,
          value: JSON.stringify(error, null, 2),
        });

        onEnd();
      },
      () => {
        addGrpcStreamMessage(tab.id, {
          type: GrpcStreamMessageType.ENDED,
        });

        onEnd();
      }
    );

    return id;
  }

  function send(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>, callId: string): Promise<void> {
    const request = parseRequest(tab);

    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CLIENT_MESSAGE,
      value: tab.data.requestTabs.request.value,
    });

    return window.clients.grpc.clientStreaming.send(callId, request);
  }

  function end(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>, callId: string): Promise<void> {
    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.ENDED,
    });

    return window.clients.grpc.clientStreaming.end(callId);
  }

  function cancel(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>, callId: string): Promise<void> {
    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CANCELED,
    });

    return window.clients.grpc.clientStreaming.cancel(callId);
  }

  return { invoke, cancel, send, end };
}
