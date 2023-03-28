import { SetOptional } from 'type-fest';

import { ITlsPreset, TlsPreset } from '@core';

export interface TlsPresetsStorageSlice {
  tlsPresets: TlsPreset[];

  fetchTlsPresets: () => Promise<void>;
  upsertTlsPreset: (preset: SetOptional<ITlsPreset, 'id'>) => Promise<void>;
  removeTlsPreset: (id: string) => Promise<void>;
}
