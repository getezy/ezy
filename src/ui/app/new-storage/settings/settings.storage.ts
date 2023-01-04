/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import create from 'zustand';

import { LocalAPI } from '@api';
import { Alignment, Language, Theme } from '@database';

import { SettingsState, SettingsStorage } from './settings.interface';

const initialState: SettingsState = {
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
    const [theme, alignment, language, menu] = await Promise.all([
      LocalAPI.settings.fetchTheme(),
      LocalAPI.settings.fetchAlignment(),
      LocalAPI.settings.fetchLanguage(),
      LocalAPI.settings.fetchMenuOptions(),
    ]);

    set(
      produce<SettingsStorage>((state) => {
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
      produce<SettingsStorage>((state) => {
        state.theme = theme;
      })
    );
  },

  setAlignment: async (alignment) => {
    await LocalAPI.settings.setAlignment(alignment);

    set(
      produce<SettingsStorage>((state) => {
        state.alignment = alignment;
      })
    );
  },

  setMenu: async (menu) => {
    await LocalAPI.settings.setMenu(menu);

    set(
      produce<SettingsStorage>((state) => {
        state.menu = menu;
      })
    );
  },
}));
