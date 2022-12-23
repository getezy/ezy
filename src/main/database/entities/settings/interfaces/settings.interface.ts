/* eslint-disable max-classes-per-file */

import { Alignment } from './alignment.enum';
import { SettingsKey } from './key.enum';
import { Language } from './language.enum';
import { Theme } from './theme-type.enum';

export interface ThemeValue {
  theme: Theme;
}

export interface AlignmentValue {
  alignment: Alignment;
}

export interface LanguageValue {
  language: Language;
}

export interface MenuOptionsValue {
  collapsed: boolean;
}

export interface Settings {
  key: SettingsKey;

  value: ThemeValue | AlignmentValue | LanguageValue | MenuOptionsValue;
}
