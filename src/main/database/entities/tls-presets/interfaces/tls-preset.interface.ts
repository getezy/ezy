import { GrpcTlsConfig, GrpcTlsType } from '@core';

export interface TlsPreset {
  id: string;
  name: string;
  system: boolean;
  tls: GrpcTlsConfig<GrpcTlsType>;
}
