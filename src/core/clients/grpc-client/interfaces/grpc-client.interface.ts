export enum GrpcTlsType {
  SERVER_SIDE = 'server-side',
  MUTUAL = 'mutual',
}

export interface GrpcTlsConfig<T extends GrpcTlsType> {
  type: T;

  rootCertificatePath: string;

  clientCertificatePath: T extends GrpcTlsType.MUTUAL ? string : never;

  clientKeyPath: T extends GrpcTlsType.MUTUAL ? string : never;
}

export interface GrpcClientRequestOptions {
  serviceName: string;
  methodName: string;

  address: string;
  tls?: GrpcTlsConfig<GrpcTlsType>;
}
