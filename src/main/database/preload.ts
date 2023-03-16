import {
  AbstractTab as TabView,
  IEnvironment as EnvironmentView,
  ISetting as SettingView,
  ITlsPreset as TlsPresetView,
} from '@core';

import { PreloadFactory } from './common';
import { Environment, Setting, Tab, TlsPreset } from './entities';

export const Database = {
  settings: PreloadFactory.create<Setting, SettingView>(Setting),
  environment: PreloadFactory.create<Environment, EnvironmentView>(Environment),
  tlsPresets: PreloadFactory.create<TlsPreset, TlsPresetView>(TlsPreset),
  tabs: PreloadFactory.create<Tab, TabView>(Tab),
};
