import { GrpcProtocolOptions, GrpcWebProtocolOptions } from '@getezy/grpc-client';

import { GrpcProtocolType } from './grpc-protocol-type.enum';

export type ProtocolOptions<T extends GrpcProtocolType> = T extends GrpcProtocolType.Grpc
  ? GrpcProtocolOptions
  : GrpcWebProtocolOptions;
