export enum GrpcTlsType {
  INSECURE = "insecure",
  SERVER_SIDE = "server-side",
  MUTUAL = "mutual",
}

export type GrpcTlsConfig<T extends GrpcTlsType = GrpcTlsType> = T extends GrpcTlsType.MUTUAL
  ? GrpcMutualTlsConfig
  : T extends GrpcTlsType.SERVER_SIDE
  ? GrpcServerSideTlsConfig
  : GrpcInsecureTlsConfig;

/**
 * https://grpc.github.io/grpc/core/group__grpc__arg__keys.html
 */
export interface GrpcChannelOptions {
  /**
   * This should be used for testing only.
   *
   * The caller of the secure_channel_create functions may override
   * the target name used for SSL host name checking using this channel
   * argument which is of type GRPC_ARG_STRING. If this argument is
   * not specified, the name used for SSL host name checking will be
   * the target parameter (assuming that the secure channel is an SSL channel).
   * If this parameter is specified and the underlying is not an SSL channel, it will just be ignored.
   */
  sslTargetNameOverride?: string;

  authorityOverride?: string;
}

export interface GrpcServerSideTlsConfig {
  type: GrpcTlsType.SERVER_SIDE;

  rootCertificatePath?: string;

  channelOptions?: GrpcChannelOptions;
}

export interface GrpcMutualTlsConfig {
  type: GrpcTlsType.MUTUAL;

  rootCertificatePath?: string;

  clientCertificatePath: string;

  clientKeyPath: string;

  channelOptions?: GrpcChannelOptions;
}

export interface GrpcInsecureTlsConfig {
  type: GrpcTlsType.INSECURE;

  channelOptions?: GrpcChannelOptions;
}

export interface GrpcClientRequestOptions {
  serviceName: string;

  methodName: string;

  address: string;

  authorityOverride?: string;

  tls: GrpcTlsConfig<GrpcTlsType>;
}

export function isInsecureTlsConfig(config: GrpcTlsConfig<GrpcTlsType>): config is GrpcTlsConfig<GrpcTlsType.INSECURE> {
  return config.type === GrpcTlsType.INSECURE;
}

export function isMutualTlsConfig(config: GrpcTlsConfig<GrpcTlsType>): config is GrpcTlsConfig<GrpcTlsType.MUTUAL> {
  return config.type === GrpcTlsType.MUTUAL;
}
