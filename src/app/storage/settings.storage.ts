import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Language, SettingsStorage, ThemeType } from './interfaces';

export const useSettingsStore = create(
  persist<SettingsStorage>(
    () => ({
      type: ThemeType.Dark,
      language: Language.EN,
    }),
    {
      name: 'settings',
      getStorage: () => window.electron.store,
    }
  )
);
