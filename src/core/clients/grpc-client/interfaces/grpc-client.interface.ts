import { ChannelOptions } from '@grpc/grpc-js';

export enum GrpcTlsType {
  INSECURE = 'insecure',
  SERVER_SIDE = 'server-side',
  MUTUAL = 'mutual',
}

export type GrpcTlsConfig<T extends GrpcTlsType = GrpcTlsType> = T extends GrpcTlsType.MUTUAL
  ? GrpcMutualTlsConfig
  : T extends GrpcTlsType.SERVER_SIDE
  ? GrpcServerSideTlsConfig
  : GrpcInsecureTlsConfig;

export interface GrpcServerSideTlsConfig {
  type: GrpcTlsType.SERVER_SIDE;

  rootCertificatePath?: string;

  channelOptions?: ChannelOptions;
}

export interface GrpcMutualTlsConfig {
  type: GrpcTlsType.MUTUAL;

  rootCertificatePath?: string;

  clientCertificatePath: string;

  clientKeyPath: string;

  channelOptions?: ChannelOptions;
}

export interface GrpcInsecureTlsConfig {
  type: GrpcTlsType.INSECURE;

  channelOptions?: ChannelOptions;
}

export interface GrpcClientRequestOptions {
  serviceName: string;
  methodName: string;

  address: string;
  tls: GrpcTlsConfig<GrpcTlsType>;
}

export function isInsecureTlsConfig(
  config: GrpcTlsConfig<GrpcTlsType>
): config is GrpcTlsConfig<GrpcTlsType.INSECURE> {
  return config.type === GrpcTlsType.INSECURE;
}

export function isMutualTlsConfig(
  config: GrpcTlsConfig<GrpcTlsType>
): config is GrpcTlsConfig<GrpcTlsType.MUTUAL> {
  return config.type === GrpcTlsType.MUTUAL;
}
