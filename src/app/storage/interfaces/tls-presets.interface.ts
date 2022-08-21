import {
  GrpcTlsConfig,
  GrpcTlsType,
} from '../../../core/clients/grpc-client/interfaces/grpc-client.interface';

export interface TlsPreset<T extends GrpcTlsType = GrpcTlsType> {
  id: string;
  name: string;
  system: boolean;
  tls: GrpcTlsConfig<T>;
}

export interface TlsPresetsStorage {
  presets: TlsPreset[];

  createTlsPreset: (preset: Omit<TlsPreset, 'system'>) => void;
  updateTlsPreset: (id: string, preset: Omit<TlsPreset, 'id'>) => void;
  removeTlsPreset: (id: string) => void;
}
