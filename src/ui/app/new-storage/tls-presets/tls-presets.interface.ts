import { SetOptional } from 'type-fest';

import { ITlsPreset, TlsPreset } from '@core';

export interface TlsPresetsStorage {
  presets: TlsPreset[];

  fetch: () => Promise<void>;
  upsertTlsPreset: (preset: SetOptional<ITlsPreset, 'id'>) => void;
  removeTlsPreset: (id: string) => void;
}
