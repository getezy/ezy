import { Setting as SettingView, TlsPreset as TlsPresetView } from '@core';

import { preload, PreloadFactory } from './common';
import { Collection, Environment, Setting, TlsPreset } from './entities';

export const Database = {
  settings: PreloadFactory.create<Setting, SettingView>(Setting),
  environment: preload(Environment),
  tlsPresets: PreloadFactory.create<TlsPreset, TlsPresetView>(TlsPreset),
  collections: preload(Collection),
};
