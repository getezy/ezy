import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { useNotification } from '../../../../../components';
import { GrpcTab, useCollectionsStore, useTabsStore } from '../../../../../storage';
import { getOptions, parseMetadata, parseRequest } from './prepare-request';

export function useUnaryCall() {
  const collections = useCollectionsStore((store) => store.collections);
  const { updateGrpcTabData } = useTabsStore((store) => store);
  const { notification } = useNotification();

  async function invoke(tab: GrpcTab<GrpcMethodType.UNARY>): Promise<void> {
    try {
      const [grpcOptions, requestOptions] = getOptions(collections, tab);
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
        { title: 'Invoke request error', desctiption: error.message },
        { type: 'error' }
      );
    }
  }

  return { invoke };
}
