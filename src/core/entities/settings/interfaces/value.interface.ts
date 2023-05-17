import { Alignment } from './alignment.enum';
import { SettingKey } from './key.enum';
import { Language } from './language.enum';
import { Theme } from './theme.enum';

export interface MenuOptions {
  collapsed: boolean;
}

export type SettingValue<Key extends SettingKey> = Key extends SettingKey.ALIGNMENT
  ? Alignment
  : Key extends SettingKey.LANGUAGE
  ? Language
  : Key extends SettingKey.MENU
  ? MenuOptions
  : Key extends SettingKey.THEME
  ? Theme
  : never;
