/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import create from 'zustand';

import { SettingsStorage, ThemeType } from './settings.interface';

export const useSettingsStore = create<SettingsStorage>((set) => ({
  theme: ThemeType.DARK,

  fetch: async () => {
    const theme = await window.database.settings.findOne({ key: 'theme' });
    if (theme) {
      set(
        produce<SettingsStorage>((state) => {
          state.theme = theme.value as ThemeType;
        })
      );
    }
  },

  setTheme: async (theme) => {
    await window.database.settings.upsert({ key: 'theme', value: theme });

    set(
      produce<SettingsStorage>((state) => {
        state.theme = theme;
      })
    );
  },
}));
