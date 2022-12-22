/* eslint-disable max-classes-per-file */

import {
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import {
  Alignment,
  IAlignmentValue,
  ILanguageValue,
  IMenuValue,
  ISettings,
  IThemeValue,
  Language,
  SettingsKey,
  Theme,
} from './interfaces';
// eslint-disable-next-line import/no-cycle
import { SettingsRepository } from './settings.repository';

@Embeddable({ discriminatorColumn: 'key', discriminatorValue: SettingsKey.THEME })
export class ThemeValue implements IThemeValue {
  @Enum(() => Theme)
  theme!: Theme;
}

@Embeddable({ discriminatorColumn: 'key', discriminatorValue: SettingsKey.ALIGNMENT })
export class AlignmentValue implements IAlignmentValue {
  @Enum(() => Alignment)
  alignment!: Alignment;
}

@Embeddable({ discriminatorColumn: 'key', discriminatorValue: SettingsKey.LANGUAGE })
export class LanguageValue implements ILanguageValue {
  @Enum(() => Language)
  language!: Language;
}

@Embeddable({ discriminatorColumn: 'key', discriminatorValue: SettingsKey.MENU })
export class MenuValue implements IMenuValue {
  @Property()
  collapsed!: boolean;
}

@Entity({ tableName: 'settings', customRepository: () => SettingsRepository })
export class Settings implements ISettings {
  [EntityRepositoryType]?: SettingsRepository;

  @PrimaryKey()
  @Enum(() => SettingsKey)
  key!: SettingsKey;

  @Embedded(() => [ThemeValue, AlignmentValue, LanguageValue, MenuValue], { object: true })
  value!: ThemeValue | AlignmentValue | LanguageValue | MenuValue;
}
