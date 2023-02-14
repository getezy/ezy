import { ProtobufLoaderOptions } from '@getezy/grpc-client';

import { GrpcLoaderType } from './grpc-loader-type.enum';

export type LoaderOptions<T extends GrpcLoaderType> = T extends GrpcLoaderType.Protobuf
  ? ProtobufLoaderOptions
  : never;
