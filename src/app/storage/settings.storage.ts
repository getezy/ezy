/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Alignment, Language, SettingsStorage, ThemeType } from './interfaces';

export const useSettingsStore = create(
  persist<SettingsStorage>(
    (set) => ({
      theme: ThemeType.DARK,
      language: Language.EN,
      alignment: Alignment.VERTICAL,

      updateTheme: (theme) =>
        set(
          produce<SettingsStorage>((state) => {
            state.theme = theme;
          })
        ),

      updateAlignment: (alignment) =>
        set(
          produce<SettingsStorage>((state) => {
            state.alignment = alignment;
          })
        ),
    }),
    {
      name: 'settings',
      getStorage: () => window.electronStore,
    }
  )
);
