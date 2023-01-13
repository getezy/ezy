import {
  Collection as CollectionView,
  Environment as EnvironmentView,
  Setting as SettingView,
  TlsPreset as TlsPresetView,
} from '@core';

import { PreloadFactory } from './common';
import { Collection, Environment, Setting, TlsPreset } from './entities';

export const Database = {
  settings: PreloadFactory.create<Setting, SettingView>(Setting),
  environment: PreloadFactory.create<Environment, EnvironmentView>(Environment),
  tlsPresets: PreloadFactory.create<TlsPreset, TlsPresetView>(TlsPreset),
  collections: PreloadFactory.create<Collection, CollectionView>(Collection),
};
