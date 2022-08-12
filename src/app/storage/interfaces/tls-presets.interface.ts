import {
  GrpcTlsConfig,
  GrpcTlsType,
} from '../../../core/clients/grpc-client/interfaces/grpc-client.interface';

export interface TlsPreset {
  id: string;
  name: string;
  system: boolean;
  tls: GrpcTlsConfig<GrpcTlsType>;
}

export interface TlsPresetsStorage {
  presets: TlsPreset[];

  createTlsPreset: (preset: Omit<TlsPreset, 'system'>) => void;
  removeTlsPreset: (id: string) => void;
}
