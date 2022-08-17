export enum Language {
  EN = 'en',
}

export enum ThemeType {
  Dark = 'dark',
  Light = 'light',
}

export interface Settings {
  theme: ThemeType;
  language: Language;
}

export interface SettingsStorage extends Settings {
  updateTheme: (theme: ThemeType) => void;
}
