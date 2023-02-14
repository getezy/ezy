import { AbstractProtocol, GrpcMetadataValue, GrpcWebMetadataValue } from '@getezy/grpc-client';

import { GrpcProtocolType } from './grpc-protocol-type.enum';

export type AbstractProtocolMetadataValue<T> = T extends AbstractProtocol<infer MetadataValue, any>
  ? MetadataValue
  : T;

export type AbstractProtocolMetadata<T> = T extends AbstractProtocol<any, infer Metadata>
  ? Metadata
  : T;

export type GrpcMetadata<T extends GrpcProtocolType> = T extends GrpcProtocolType.Grpc
  ? Record<string, GrpcMetadataValue>
  : Record<string, GrpcWebMetadataValue>;
