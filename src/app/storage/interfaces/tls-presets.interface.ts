import {
  GrpcTlsConfig,
  GrpcTlsType,
} from '../../../core/clients/grpc-client/interfaces/grpc-client.interface';

export interface TlsPreset {
  id: string;
  name: string;
  tls: GrpcTlsConfig<GrpcTlsType>;
}

export interface TlsPresetsStorage {
  presets: TlsPreset[];

  createTlsPreset: (preset: TlsPreset) => void;
  removeTlsPreset: (id: string) => void;
}
