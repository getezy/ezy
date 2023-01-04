import { notification } from '@components';
import { GrpcMethodType } from '@core';
import { useTlsPresetsStore } from '@new-storage';
import { GrpcStreamMessageType, GrpcTab, useCollectionsStore, useTabsStore } from '@storage';

import { getOptions, getTlsOptions, parseMetadata, parseRequest } from './prepare-request';
import { useGrpcTabContextStore } from './use-grpc-tab-context';

export function useClientStreaming() {
  const collections = useCollectionsStore((store) => store.collections);
  const { addGrpcStreamMessage } = useTabsStore((store) => store);
  const tlsPresets = useTlsPresetsStore((store) => store.presets);
  const { setContext, getContext, updateContext, deleteContext } = useGrpcTabContextStore();

  function isRequestLoading(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>) {
    if (getContext<GrpcMethodType.CLIENT_STREAMING>(tab.id)?.isClientStreaming) {
      throw new Error('Request already invoked');
    }
  }

  function getCallId(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>): string | undefined {
    return getContext<GrpcMethodType>(tab.id)?.callId;
  }

  async function invoke(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>): Promise<void> {
    try {
      isRequestLoading(tab);

      setContext<GrpcMethodType.CLIENT_STREAMING>(tab.id, { isClientStreaming: true });
      const tls = getTlsOptions(tlsPresets, tab.data.tlsId);
      const [grpcOptions, requestOptions] = getOptions(collections, tab, tls);
      const metadata = parseMetadata(tab);

      addGrpcStreamMessage(
        tab.id,
        {
          type: GrpcStreamMessageType.STARTED,
          timestamp: new Date().getTime(),
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
            timestamp: new Date().getTime(),
            value: JSON.stringify(data, null, 2),
          });
        },
        (error) => {
          addGrpcStreamMessage(tab.id, {
            type: GrpcStreamMessageType.ERROR,
            timestamp: new Date().getTime(),
            value: JSON.stringify(error, null, 2),
          });

          deleteContext(tab.id);
        }
      );

      updateContext<GrpcMethodType.CLIENT_STREAMING>(tab.id, { callId: id });
    } catch (error: any) {
      notification(
        { title: 'Invoke request error', description: error.message },
        { type: 'error', position: 'bottom-right' }
      );

      deleteContext(tab.id);
    }
  }

  async function send(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>): Promise<void> {
    try {
      const callId = getCallId(tab);

      if (callId) {
        const request = parseRequest(tab);

        await window.clients.grpc.clientStreaming.send(callId, request);

        addGrpcStreamMessage(tab.id, {
          type: GrpcStreamMessageType.CLIENT_MESSAGE,
          timestamp: new Date().getTime(),
          value: tab.data.requestTabs.request.value,
        });
      }
    } catch (error: any) {
      notification(
        { title: `Send message error`, description: error.message },
        { type: 'error', position: 'bottom-right' }
      );
    }
  }

  async function end(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>): Promise<void> {
    const callId = getCallId(tab);

    if (callId) {
      await window.clients.grpc.clientStreaming.end(callId);

      addGrpcStreamMessage(tab.id, {
        type: GrpcStreamMessageType.CLIENT_STREAMING_ENDED,
        timestamp: new Date().getTime(),
      });

      deleteContext(tab.id);
    }
  }

  async function cancel(tab: GrpcTab<GrpcMethodType.CLIENT_STREAMING>): Promise<void> {
    const callId = getCallId(tab);

    if (callId) {
      await window.clients.grpc.clientStreaming.cancel(callId);

      addGrpcStreamMessage(tab.id, {
        type: GrpcStreamMessageType.CANCELED,
        timestamp: new Date().getTime(),
      });

      deleteContext(tab.id);
    }
  }

  return { invoke, cancel, send, end };
}
