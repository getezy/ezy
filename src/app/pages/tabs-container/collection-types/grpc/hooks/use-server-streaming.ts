import { notification } from '@components';
import { GrpcMethodType } from '@core/types';
import {
  GrpcProtocol,
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
  useTlsPresetsStore,
} from '@storage';

import { getOptions, getTlsOptions, parseMetadata, parseRequest } from './prepare-request';

export function useServerStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { addGrpcStreamMessage } = useTabsStore((store) => store);
  const tlsPresets = useTlsPresetsStore((store) => store.presets);

  async function invoke(
    tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>,
    onEnd: () => void
  ): Promise<string | undefined> {
    try {
      const tls = getTlsOptions(tlsPresets, tab.data.tlsId);
      const [grpcOptions, requestOptions] = getOptions(collections, tab, tls);
      const request = parseRequest(tab);
      const metadata = parseMetadata(tab);

      addGrpcStreamMessage(
        tab.id,
        {
          type: GrpcStreamMessageType.STARTED,
          timestamp: new Date().getTime(),
          value: tab.data.requestTabs.request.value,
        },
        true
      );

      const client =
        tab.data.protocol === GrpcProtocol.GRPC ? window.clients.grpc : window.clients.grpcWeb;

      const id = await client.serverStreaming.invoke(
        grpcOptions,
        requestOptions,
        request,
        metadata,
        (data) => {
          addGrpcStreamMessage(tab.id, {
            type: GrpcStreamMessageType.SERVER_MESSAGE,
            timestamp: new Date().getTime(),
            value: JSON.stringify(data, null, 2),
          });
        },
        (error) => {
          addGrpcStreamMessage(tab.id, {
            type: GrpcStreamMessageType.ERROR,
            timestamp: new Date().getTime(),
            value: error.message,
          });

          onEnd();
        },
        () => {
          addGrpcStreamMessage(tab.id, {
            type: GrpcStreamMessageType.SERVER_STREAMING_ENDED,
            timestamp: new Date().getTime(),
          });

          onEnd();
        }
      );

      return id;
    } catch (error: any) {
      notification(
        { title: 'Invoke request error', description: error.message },
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
      timestamp: new Date().getTime(),
    });

    const client =
      tab.data.protocol === GrpcProtocol.GRPC ? window.clients.grpc : window.clients.grpcWeb;

    await client.serverStreaming.cancel(callId);
  }

  return { invoke, cancel };
}
