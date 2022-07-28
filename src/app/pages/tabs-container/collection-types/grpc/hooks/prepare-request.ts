import { MetadataValue } from '@grpc/grpc-js';

import { GrpcClientRequestOptions } from '../../../../../../core/clients/grpc-client/interfaces';
import { GrpcMethodType, GrpcOptions } from '../../../../../../core/protobuf/interfaces';
import { Collection, CollectionType, GrpcTab } from '../../../../../storage';

function getRequestAddress(tab: GrpcTab<GrpcMethodType>): string {
  if (tab.data.url && tab.data.url.length > 0) {
    return tab.data.url;
  }

  throw new Error(`Couldn't invoke request. Address is empty.`);
}

export function getOptions(
  collections: Collection<CollectionType>[],
  tab: GrpcTab<GrpcMethodType>
): [GrpcOptions, GrpcClientRequestOptions] {
  const collection = collections.find((item) => item.id === tab.info.collectionId);
  const service = collection?.children?.find((item) => item.id === tab.info.serviceId);
  const method = service?.methods?.find((item) => item.id === tab.info.methodId);

  if (collection && service && method) {
    return [
      collection.options,
      { serviceName: service.name, methodName: method.name, address: getRequestAddress(tab) },
    ];
  }

  throw new Error(`Couldn't get request options. Try to sync collection.`);
}

export function parseRequest(tab: GrpcTab<GrpcMethodType>): Record<string, unknown> {
  try {
    const request = JSON.parse(tab.data.requestTabs.request.value || '{}');

    return request;
  } catch (error) {
    throw new Error(`Couldn't parse request message.`);
  }
}

export function parseMetadata(tab: GrpcTab<GrpcMethodType>): Record<string, MetadataValue> {
  try {
    const metadata = JSON.parse(tab.data.requestTabs.metadata.value || '{}');

    return metadata;
  } catch (error) {
    throw new Error(`Couldn't parse metadata.`);
  }
}
