import { SetOptional } from 'type-fest';

import { TlsPreset } from '@database/types';

export function fetch() {
  return window.database.tlsPresets.find();
}

export function upsert(tlsPreset: SetOptional<TlsPreset, 'id'>) {
  return window.database.tlsPresets.upsert(tlsPreset);
}

export function remove(id: string) {
  return window.database.tlsPresets.delete({ id });
}
