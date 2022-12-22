/* eslint-disable max-classes-per-file */

import { Alignment } from './alignment.enum';
import { SettingsKey } from './key.enum';
import { Language } from './language.enum';
import { Theme } from './theme-type.enum';

export abstract class IThemeValue {
  theme!: Theme;
}

export abstract class IAlignmentValue {
  alignment!: Alignment;
}

export abstract class ILanguageValue {
  language!: Language;
}

export abstract class IMenuValue {
  collapsed!: boolean;
}

export abstract class ISettings {
  key!: SettingsKey;

  value!: IThemeValue | IAlignmentValue | ILanguageValue | IMenuValue;
}
