/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { LocalAPI } from '@api';
import { Alignment, Language, Theme } from '@core';

import { AppStorage } from '../app.interface';
import { SettingsState, SettingsStorageSlice } from './settings.interface';

const initialState: SettingsState = {
  theme: Theme.DARK,
  alignment: Alignment.HORIZONTAL,
  language: Language.EN,
  menu: {
    collapsed: true,
  },
};

export const createSettingsSlice: StateCreator<AppStorage, [], [], SettingsStorageSlice> = (
  set
) => ({
  ...initialState,

  fetchSettings: async () => {
    const [theme, alignment, language, menu] = await LocalAPI.settings.fetchAllSettings();

    set(
      produce<AppStorage>((state) => {
        state.theme = theme;
        state.alignment = alignment;
        state.language = language;
        state.menu = menu;
      })
    );
  },

  setTheme: async (theme) => {
    await LocalAPI.settings.setTheme(theme);

    set(
      produce<AppStorage>((state) => {
        state.theme = theme;
      })
    );
  },

  setAlignment: async (alignment) => {
    await LocalAPI.settings.setAlignment(alignment);

    set(
      produce<AppStorage>((state) => {
        state.alignment = alignment;
      })
    );
  },

  setMenu: async (menu) => {
    await LocalAPI.settings.setMenu(menu);

    set(
      produce<AppStorage>((state) => {
        state.menu = menu;
      })
    );
  },
});
