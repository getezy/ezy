import { SetOptional } from 'type-fest';

import { TlsPreset } from '@core';

export interface TlsPresetsStorage {
  presets: TlsPreset[];

  fetch: () => Promise<void>;
  upsertTlsPreset: (preset: SetOptional<TlsPreset, 'id'>) => void;
  removeTlsPreset: (id: string) => void;
}
