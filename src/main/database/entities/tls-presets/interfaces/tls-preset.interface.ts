import { GrpcTlsConfig, GrpcTlsType } from '@core/types';

export interface TlsPreset {
  id: string;
  name: string;
  system: boolean;
  tls: GrpcTlsConfig<GrpcTlsType>;
}
