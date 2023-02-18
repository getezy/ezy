import { SetOptional } from 'type-fest';

import { ITlsPreset } from '@core';

export function fetch() {
  return window.database.tlsPresets.find({});
}

export function upsert(tlsPreset: SetOptional<ITlsPreset, 'id'>) {
  return window.database.tlsPresets.upsert(tlsPreset);
}

export function remove(id: string) {
  return window.database.tlsPresets.delete({ id });
}
