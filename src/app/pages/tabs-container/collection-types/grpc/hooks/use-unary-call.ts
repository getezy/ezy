import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { GrpcTab, useCollectionsStore, useTabsStore } from '../../../../../storage';
import { getOptions } from './prepare-request';

export function useUnaryCall() {
  const collections = useCollectionsStore((store) => store.collections);
  const { updateGrpcTabData } = useTabsStore((store) => store);

  async function invoke(tab: GrpcTab<GrpcMethodType.UNARY>): Promise<void> {
    const [grpcOptions, requestOptions] = getOptions(collections, tab);

    const result = await window.clients.grpc.unary.invoke(
      grpcOptions,
      requestOptions,
      JSON.parse(tab.data.requestTabs.request.value || '{}'),
      JSON.parse(tab.data.requestTabs.metadata.value || '{}')
    );

    updateGrpcTabData<GrpcMethodType.UNARY>(tab.id, {
      response: {
        ...tab.data.response,
        value: JSON.stringify(result, null, 2),
      },
    });
  }

  return { invoke };
}
