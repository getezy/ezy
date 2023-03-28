import { SetOptional } from 'type-fest';

import { ITlsPreset, TlsPreset } from '@core';

export interface TlsPresetsStorage {
  presets: TlsPreset[];

  fetch: () => Promise<void>;
  upsertTlsPreset: (preset: SetOptional<ITlsPreset, 'id'>) => Promise<void>;
  removeTlsPreset: (id: string) => Promise<void>;
}
