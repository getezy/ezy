import { SettingKey } from './key.enum';
import { AlignmentValue, LanguageValue, MenuOptions, ThemeValue } from './value.interface';

export type SettingValue<Key extends SettingKey> = Key extends SettingKey.ALIGNMENT
  ? AlignmentValue
  : Key extends SettingKey.LANGUAGE
  ? LanguageValue
  : Key extends SettingKey.MENU
  ? MenuOptions
  : Key extends SettingKey.THEME
  ? ThemeValue
  : never;

export interface ISetting<Key extends SettingKey = SettingKey> {
  key: Key;

  value: SettingValue<Key>;
}
