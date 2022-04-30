import create from 'zustand';

import { SettingsStorage, ThemeType } from './interfaces';

export const useSettingsStore = create<SettingsStorage>(() => ({
  type: ThemeType.Dark,
}));
