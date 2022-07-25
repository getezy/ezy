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
      }
    );

    return id;
  }

  async function send(
    tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>,
    callId: string
  ): Promise<void> {
    const request = parseRequest(tab);

    await window.clients.grpc.clientStreaming.send(callId, request);

    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CLIENT_MESSAGE,
      value: tab.data.requestTabs.request.value,
    });
  }

  async function end(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>, callId: string): Promise<void> {
    await window.clients.grpc.clientStreaming.end(callId);

    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CLIENT_STREAMING_ENDED,
    });
  }

  async function cancel(
    tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>,
    callId: string
  ): Promise<void> {
    await window.clients.grpc.clientStreaming.cancel(callId);

    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CANCELED,
    });
  }

  return { invoke, cancel, send, end };
}
