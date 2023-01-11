/* eslint-disable max-classes-per-file */

import { AutoMap } from '@automapper/classes';
import { Entity, EntityRepositoryType, Enum, JsonType, OnInit, Property } from '@mikro-orm/core';

import {
  Alignment,
  AlignmentValue as IAlignmentValue,
  isAlignmentValue,
  isLanguageValue,
  isMenuOptionsValue,
  isThemeValue,
  Language,
  LanguageValue as ILanguageValue,
  MenuOptions as IMenuOptionsValue,
  Setting as ISetting,
  SettingKey,
  Theme,
  ThemeValue as IThemeValue,
} from '@core';

// eslint-disable-next-line import/no-cycle
import { SettingsRepository } from './settings.repository';

export class ThemeValue implements IThemeValue {
  @Enum(() => Theme)
  theme!: Theme;

  constructor(value: IThemeValue) {
    this.theme = value.theme;
  }
}

export class AlignmentValue implements IAlignmentValue {
  @Enum(() => Alignment)
  alignment!: Alignment;

  constructor(value: IAlignmentValue) {
    this.alignment = value.alignment;
  }
}

export class LanguageValue implements ILanguageValue {
  @Enum(() => Language)
  language!: Language;

  constructor(value: ILanguageValue) {
    this.language = value.language;
  }
}

export class MenuOptionsValue implements IMenuOptionsValue {
  @Property()
  collapsed!: boolean;

  constructor(value: IMenuOptionsValue) {
    this.collapsed = value.collapsed;
  }
}

@Entity({ tableName: 'settings', customRepository: () => SettingsRepository })
export class Setting implements ISetting {
  [EntityRepositoryType]?: SettingsRepository;

  @Enum({ type: 'string', items: () => SettingKey, primary: true })
  @AutoMap(() => String)
  key!: SettingKey;

  @Property({ type: JsonType })
  value!: ThemeValue | AlignmentValue | LanguageValue | MenuOptionsValue;

  @OnInit()
  init() {
    if (isAlignmentValue(this.value)) {
      this.value = new AlignmentValue(this.value);
    } else if (isLanguageValue(this.value)) {
      this.value = new LanguageValue(this.value);
    } else if (isMenuOptionsValue(this.value)) {
      this.value = new MenuOptionsValue(this.value);
    } else if (isThemeValue(this.value)) {
      this.value = new ThemeValue(this.value);
    }
  }
}
