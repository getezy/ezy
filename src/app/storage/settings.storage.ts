/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Language, SettingsStorage, ThemeType } from './interfaces';

export const useSettingsStore = create(
  persist<SettingsStorage>(
    (set) => ({
      theme: ThemeType.Dark,
      language: Language.EN,

      updateTheme: (theme) =>
        set(
          produce<SettingsStorage>((state) => {
            state.theme = theme;
          })
        ),
    }),
    {
      name: 'settings',
      getStorage: () => window.electronStore,
    }
  )
);
