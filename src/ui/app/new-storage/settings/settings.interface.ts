import { Alignment, Language, MenuOptions, Theme } from '@core';

export interface SettingsState {
  theme: Theme;
  language: Language;
  alignment: Alignment;
  menu: MenuOptions;
}

export interface SettingsStorageSlice extends SettingsState {
  fetchSettings: () => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
  setAlignment: (alignment: Alignment) => Promise<void>;
  setMenu: (menu: MenuOptions) => Promise<void>;
}
