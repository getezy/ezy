import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { notification } from '../../../../../components';
import {
  GrpcTab,
  useCollectionsStore,
  useTabsStore,
  useTlsPresetsStore,
} from '../../../../../storage';
import { getOptions, getTlsOptions, parseMetadata, parseRequest } from './prepare-request';

export function useUnaryCall() {
  const collections = useCollectionsStore((store) => store.collections);
  const { updateGrpcTabData } = useTabsStore((store) => store);
  const tlsPresets = useTlsPresetsStore((store) => store.presets);

  async function invoke(tab: GrpcTab<GrpcMethodType.UNARY>): Promise<void> {
    try {
      const tls = getTlsOptions(tlsPresets, tab.data.tlsId);
      const [grpcOptions, requestOptions] = getOptions(collections, tab, tls);
      const request = parseRequest(tab);
      const metadata = parseMetadata(tab);

      const result = await window.clients.grpc.unary.invoke(
        grpcOptions,
        requestOptions,
        request,
        metadata
      );

      updateGrpcTabData<GrpcMethodType.UNARY>(tab.id, {
        response: {
          ...tab.data.response,
          value: JSON.stringify(result, null, 2),
        },
      });
    } catch (error: any) {
      notification(
        { title: 'Invoke request error', description: error.message },
        { type: 'error' }
      );
    }
  }

  return { invoke };
}
