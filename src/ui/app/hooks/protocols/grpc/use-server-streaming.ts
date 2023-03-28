import { notification } from '@components';
import { GrpcMethodType } from '@core';
import { useGrpcTabContextStore } from '@hooks';
import { useAppStorage } from '@new-storage';
import {
  GrpcProtocol,
  GrpcStreamMessageType,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
} from '@storage';

import { getOptions, getTlsOptions, parseMetadata, parseRequest } from './prepare-request';

export function useServerStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { addGrpcStreamMessage } = useTabsStore((store) => store);
  const tlsPresets = useAppStorage((store) => store.tlsPresets);
  const { setContext, getContext, updateContext, deleteContext } = useGrpcTabContextStore();

  function getClient(tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>) {
    return tab.data.protocol === GrpcProtocol.GRPC ? window.clients.grpc : window.clients.grpcWeb;
  }

  function isRequestLoading(tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>) {
    if (getContext<GrpcMethodType.SERVER_STREAMING>(tab.id)?.isServerStreaming) {
      throw new Error('Request already invoked');
    }
  }

  function getCallId(tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>): string | undefined {
    return getContext<GrpcMethodType>(tab.id)?.callId;
  }

  async function invoke(tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>): Promise<void> {
    try {
      isRequestLoading(tab);

      setContext<GrpcMethodType.SERVER_STREAMING>(tab.id, { isServerStreaming: true });
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

      const client = getClient(tab);

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

          deleteContext(tab.id);
        },
        () => {
          addGrpcStreamMessage(tab.id, {
            type: GrpcStreamMessageType.SERVER_STREAMING_ENDED,
            timestamp: new Date().getTime(),
          });

          deleteContext(tab.id);
        }
      );

      updateContext<GrpcMethodType.SERVER_STREAMING>(tab.id, { callId: id });
    } catch (error: any) {
      notification(
        { title: 'Invoke request error', description: error.message },
        { type: 'error' }
      );

      deleteContext(tab.id);
    }
  }

  async function cancel(tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>): Promise<void> {
    const callId = getCallId(tab);

    if (callId) {
      addGrpcStreamMessage(tab.id, {
        type: GrpcStreamMessageType.CANCELED,
        timestamp: new Date().getTime(),
      });

      const client = getClient(tab);

      await client.serverStreaming.cancel(callId);

      deleteContext(tab.id);
    }
  }

  return { invoke, cancel };
}
