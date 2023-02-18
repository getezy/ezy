/* eslint-disable max-classes-per-file */

import { AutoMap } from '@automapper/classes';
import { Entity, EntityRepositoryType, Enum, JsonType, Property } from '@mikro-orm/core';

import { Alignment, Language, MenuOptions, SettingKey, Theme } from '@core';

// eslint-disable-next-line import/no-cycle
import { SettingsRepository } from './settings.repository';

export class ThemeValue {
  @Enum(() => Theme)
  theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }
}

export class AlignmentValue {
  @Enum(() => Alignment)
  alignment: Alignment;

  constructor(alignment: Alignment) {
    this.alignment = alignment;
  }
}

export class LanguageValue {
  @Enum(() => Language)
  language: Language;

  constructor(language: Language) {
    this.language = language;
  }
}

export class MenuOptionsValue {
  @Property()
  collapsed: boolean;

  constructor({ collapsed }: MenuOptions) {
    this.collapsed = collapsed;
  }
}

export type SettingValue<Key extends SettingKey> = Key extends SettingKey.ALIGNMENT
  ? AlignmentValue
  : Key extends SettingKey.LANGUAGE
  ? LanguageValue
  : Key extends SettingKey.MENU
  ? MenuOptionsValue
  : Key extends SettingKey.THEME
  ? ThemeValue
  : never;

@Entity({ tableName: 'settings', customRepository: () => SettingsRepository })
export class Setting<Key extends SettingKey = SettingKey> {
  [EntityRepositoryType]?: SettingsRepository;

  @Enum({ type: 'string', items: () => SettingKey, primary: true })
  @AutoMap(() => String)
  key!: Key;

  @Property({ type: JsonType })
  value!: SettingValue<Key>;
}
