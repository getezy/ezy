import { Alignment } from './alignment.enum';
import { Language } from './language.enum';
import { Theme } from './theme.enum';

export interface ThemeValue {
  theme: Theme;
}

export interface AlignmentValue {
  alignment: Alignment;
}

export interface LanguageValue {
  language: Language;
}

export interface MenuOptions {
  collapsed: boolean;
}
