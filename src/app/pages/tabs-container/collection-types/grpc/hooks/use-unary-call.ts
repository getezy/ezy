import { notification } from '@components';
import { GrpcMethodType } from '@core/types';
import {
  GrpcProtocol,
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
  useTlsPresetsStore,
} from '@storage';

import { getOptions, getTlsOptions, parseMetadata, parseRequest } from './prepare-request';
import { useGrpcTabContextStore } from './use-grpc-tab-context';

export function useUnaryCall() {
  const collections = useCollectionsStore((store) => store.collections);
  const { updateGrpcTabData } = useTabsStore((store) => store);
  const tlsPresets = useTlsPresetsStore((store) => store.presets);
  const { setContext, getContext, deleteContext } = useGrpcTabContextStore();

  function getClient(tab: GrpcTab<GrpcMethodType.UNARY>) {
    return tab.data.protocol === GrpcProtocol.GRPC ? window.clients.grpc : window.clients.grpcWeb;
  }

  function isRequestLoading(tab: GrpcTab<GrpcMethodType.UNARY>) {
    if (getContext<GrpcMethodType.UNARY>(tab.id)?.isLoading) {
      throw new Error('Request already invoked');
    }
  }

  async function invoke(tab: GrpcTab<GrpcMethodType.UNARY>): Promise<void> {
    try {
      isRequestLoading(tab);

      setContext<GrpcMethodType.UNARY>(tab.id, { isLoading: true });
      const tls = getTlsOptions(tlsPresets, tab.data.tlsId);
      const [grpcOptions, requestOptions] = getOptions(collections, tab, tls);
      const request = parseRequest(tab);
      const metadata = parseMetadata(tab);

      const client = getClient(tab);

      const response = await client.unary.invoke(grpcOptions, requestOptions, request, metadata);

      updateGrpcTabData<GrpcMethodType.UNARY>(tab.id, {
        response: {
          ...tab.data.response,
          code: response.code,
          timestamp: response.timestamp,
          value: JSON.stringify(response.value, null, 2),
        },
      });
    } catch (error: any) {
      notification(
        { title: 'Invoke request error', description: error.message },
        { type: 'error', position: 'bottom-right' }
      );
    } finally {
      deleteContext(tab.id);
    }
  }

  return { invoke };
}
