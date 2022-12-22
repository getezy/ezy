/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import create from 'zustand';

import { LocalAPI } from '@api';
import { Alignment, Language, Theme } from '@database/types';

import { Settings, SettingsStorage } from './settings.interface';

const initialState: Settings = {
  theme: Theme.DARK,
  alignment: Alignment.HORIZONTAL,
  language: Language.EN,
  menu: {
    collapsed: true,
  },
};

export const useSettingsStore = create<SettingsStorage>((set) => ({
  ...initialState,

  fetch: async () => {
    const theme = await LocalAPI.settings.fetchTheme();

    if (theme) {
      set(
        produce<SettingsStorage>((state) => {
          state.theme = theme;
        })
      );
    }
  },

  setTheme: async (theme) => {
    await LocalAPI.settings.setTheme(theme);

    set(
      produce<SettingsStorage>((state) => {
        state.theme = theme;
      })
    );
  },
}));
