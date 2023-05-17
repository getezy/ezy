import { GrpcChannelOptions, GrpcTlsConfig, GrpcTlsType } from '@getezy/grpc-client';

export interface ITlsPreset<T extends GrpcTlsType = GrpcTlsType> {
  id: string;

  name: string;

  system: boolean;

  tls: GrpcTlsConfig<T>;

  channelOptions?: GrpcChannelOptions;
}
