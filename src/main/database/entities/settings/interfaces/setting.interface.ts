/* eslint-disable max-classes-per-file */

import { Alignment } from './alignment.enum';
import { SettingKey } from './key.enum';
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

export interface Setting {
  key: SettingKey;

  value: ThemeValue | AlignmentValue | LanguageValue | MenuOptionsValue;
}
