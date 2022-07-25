import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import {
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
} from '../../../../../storage';
import { getOptions, parseMetadata, parseRequest } from './prepare-request';

export function useBidirectionalStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { addGrpcStreamMessage } = useTabsStore((store) => store);

  async function invoke(
    tab: GrpcTab<GrpcMethodType.BIDIRECTIONAL_STREAMING>,
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

    const id = await window.clients.grpc.bidirectionalStreaming.invoke(
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
          value: error.message,
        });

        onEnd();
      },
      () => {
        addGrpcStreamMessage(tab.id, {
          type: GrpcStreamMessageType.SERVER_STREAMING_ENDED,
        });

        onEnd();
      }
    );

    return id;
  }

  async function send(
    tab: GrpcTab<GrpcMethodType.BIDIRECTIONAL_STREAMING>,
    callId: string
  ): Promise<void> {
    const request = parseRequest(tab);

    await window.clients.grpc.bidirectionalStreaming.send(callId, request);

    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CLIENT_MESSAGE,
      value: tab.data.requestTabs.request.value,
    });
  }

  async function end(
    tab: GrpcTab<GrpcMethodType.BIDIRECTIONAL_STREAMING>,
    callId: string
  ): Promise<void> {
    await window.clients.grpc.bidirectionalStreaming.end(callId);

    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CLIENT_STREAMING_ENDED,
    });
  }

  async function cancel(
    tab: GrpcTab<GrpcMethodType.BIDIRECTIONAL_STREAMING>,
    callId: string
  ): Promise<void> {
    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CANCELED,
    });

    await window.clients.grpc.bidirectionalStreaming.cancel(callId);
  }

  return { invoke, cancel, send, end };
}
