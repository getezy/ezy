import { AutoMap } from '@automapper/classes';

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

export interface MenuOptions {
  collapsed: boolean;
}

export class Setting {
  @AutoMap()
  key!: SettingKey;

  @AutoMap()
  value!: ThemeValue | AlignmentValue | LanguageValue | MenuOptions;
}
