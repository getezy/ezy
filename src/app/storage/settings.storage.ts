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
      isMenuCollapsed: true,

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

      setIsMenuCollapsed: (isCollapsed) =>
        set(
          produce<SettingsStorage>((state) => {
            state.isMenuCollapsed = isCollapsed;
          })
        ),
    }),
    {
      name: 'settings',
      getStorage: () => window.electronStore,
    }
  )
);
