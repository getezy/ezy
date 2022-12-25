import { preload } from './common';
import { Collection, Environment, Setting, TlsPreset } from './entities';

export const Database = {
  settings: preload(Setting),
  environment: preload(Environment),
  tlsPresets: preload(TlsPreset),
  collections: preload(Collection),
};
