import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { useNotification } from '../../../../../components';
import {
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
} from '../../../../../storage';
import { getOptions, parseMetadata, parseRequest } from './prepare-request';

export function useServerStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { addGrpcStreamMessage } = useTabsStore((store) => store);
  const { notification } = useNotification();

  async function invoke(
    tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>,
    onEnd: () => void
  ): Promise<string | undefined> {
    try {
      const [grpcOptions, requestOptions] = getOptions(collections, tab);
      const request = parseRequest(tab);
      const metadata = parseMetadata(tab);

      addGrpcStreamMessage(
        tab.id,
        {
          type: GrpcStreamMessageType.STARTED,
          value: tab.data.requestTabs.request.value,
        },
        true
      );

      const id = await window.clients.grpc.serverStreaming.invoke(
        grpcOptions,
        requestOptions,
        request,
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
    } catch (error: any) {
      notification(
        { title: 'Invoke request error', desctiption: error.message },
        { type: 'error' }
      );
    }

    return undefined;
  }

  async function cancel(
    tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>,
    callId: string
  ): Promise<void> {
    addGrpcStreamMessage(tab.id, {
      type: GrpcStreamMessageType.CANCELED,
    });

    await window.clients.grpc.serverStreaming.cancel(callId);
  }

  return { invoke, cancel };
}
