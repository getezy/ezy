import create from 'zustand';

import { Language, SettingsStorage, ThemeType } from './interfaces';

export const useSettingsStore = create<SettingsStorage>(() => ({
  type: ThemeType.Dark,
  language: Language.EN,
}));
