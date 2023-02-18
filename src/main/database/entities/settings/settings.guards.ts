import { SettingKey } from '@core';

import { Setting } from './setting.entity';

export function isAlignmentSetting(value: any): value is Setting<SettingKey.ALIGNMENT> {
  return value?.key === SettingKey.ALIGNMENT;
}

export function isLanguageSetting(value: any): value is Setting<SettingKey.LANGUAGE> {
  return value?.key === SettingKey.LANGUAGE;
}

export function isMenuOptionsSetting(value: any): value is Setting<SettingKey.MENU> {
  return value?.key === SettingKey.MENU;
}

export function isThemeSetting(value: any): value is Setting<SettingKey.THEME> {
  return value?.key === SettingKey.THEME;
}
