import { Alignment, Language, MenuOptions, Theme } from '@core';

export interface SettingsState {
  theme: Theme;
  language: Language;
  alignment: Alignment;
  menu: MenuOptions;
}

export interface SettingsStorage extends SettingsState {
  fetch: () => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
  setAlignment: (alignment: Alignment) => void;
  setMenu: (menu: MenuOptions) => void;
}
