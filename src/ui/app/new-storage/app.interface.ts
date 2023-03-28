import { EnvironmentsStorageSlice } from './environments/environments.interface';
import { SettingsStorageSlice } from './settings/settings.interface';
import { TabsStorageSlice } from './tabs/tabs.interface';
import { TlsPresetsStorageSlice } from './tls-presets/tls-presets.interface';

export interface AppStorageSlice {
  fetch: () => Promise<void>;
}

export type AppStorage = AppStorageSlice &
  EnvironmentsStorageSlice &
  TabsStorageSlice &
  SettingsStorageSlice &
  TlsPresetsStorageSlice;
