export enum Language {
  EN = 'en',
}

export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum Alignment {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface Settings {
  theme: ThemeType;
  language: Language;
  alignment: Alignment;
  isMenuCollapsed: boolean;
}

export interface SettingsStorage extends Settings {
  updateTheme: (theme: ThemeType) => void;
  updateAlignment: (alignment: Alignment) => void;
  setIsMenuCollapsed: (isCollapsed: boolean) => void;
}
