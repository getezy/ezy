import { GrpcClientRequestOptions } from '../../../../../../core/clients/grpc-client/interfaces';
import { GrpcMethodType, GrpcOptions } from '../../../../../../core/protobuf/interfaces';
import { Collection, CollectionType, GrpcTab } from '../../../../../storage';

export function getOptions(
  collections: Collection<CollectionType>[],
  tab: GrpcTab<GrpcMethodType>
): [GrpcOptions, GrpcClientRequestOptions] {
  const collection = collections.find((item) => item.id === tab.info.collectionId);
  const service = collection?.children?.find((item) => item.id === tab.info.serviceId);
  const method = service?.methods?.find((item) => item.id === tab.info.methodId);

  if (collection && service && method && tab.data.url) {
    return [
      collection.options,
      { serviceName: service.name, methodName: method.name, address: tab.data.url },
    ];
  }

  throw new Error(`Couldn't get request options. Try to sync collection.`);
}
