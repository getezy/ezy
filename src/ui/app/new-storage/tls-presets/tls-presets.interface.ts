import { SetOptional } from 'type-fest';

import { TlsPreset } from '@database';

export interface TlsPresetsStorage {
  presets: TlsPreset[];

  fetch: () => Promise<void>;
  upsertTlsPreset: (preset: SetOptional<TlsPreset, 'id'>) => void;
  removeTlsPreset: (id: string) => void;
}
