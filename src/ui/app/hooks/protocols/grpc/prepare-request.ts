import {
  GrpcClientRequestOptions,
  GrpcMethodType,
  GrpcOptions,
  GrpcTlsConfig,
  GrpcTlsType,
  TlsPreset,
} from '@core';
import { Collection, CollectionType, GrpcTab } from '@storage';

function getRequestAddress(tab: GrpcTab<GrpcMethodType>): string {
  if (tab.data.url && tab.data.url.length > 0) {
    return tab.data.url;
  }

  throw new Error('Address is empty.');
}

export function getTlsOptions(presets: TlsPreset[], id?: string): GrpcTlsConfig<GrpcTlsType> {
  const preset = presets.find((item) => item.id === id);

  if (preset) {
    return preset.tls;
  }

  return {
    type: GrpcTlsType.INSECURE,
  };
}

export function getOptions(
  collections: Collection<CollectionType>[],
  tab: GrpcTab<GrpcMethodType>,
  tls: GrpcTlsConfig<GrpcTlsType>
): [GrpcOptions, GrpcClientRequestOptions] {
  const collection = collections.find((item) => item.id === tab.info.collectionId);
  const service = collection?.children?.find((item) => item.id === tab.info.serviceId);
  const method = service?.methods?.find((item) => item.id === tab.info.methodId);

  if (collection && service && method) {
    return [
      collection.options,
      {
        serviceName: service.name,
        methodName: method.name,
        address: getRequestAddress(tab),
        tls,
      },
    ];
  }

  throw new Error(`Couldn't get request options. Try to sync collection.`);
}

export function parseRequest(tab: GrpcTab<GrpcMethodType>): Record<string, unknown> {
  try {
    const request = JSON.parse(tab.data.requestTabs.request.value?.trim() || '{}');

    return request;
  } catch (error) {
    throw new Error(`Couldn't parse request message.`);
  }
}

export function parseMetadata(tab: GrpcTab<GrpcMethodType>): Record<string, unknown> {
  try {
    const metadata = JSON.parse(tab.data.requestTabs.metadata.value?.trim() || '{}');

    return metadata;
  } catch (error) {
    throw new Error(`Couldn't parse request metadata.`);
  }
}
