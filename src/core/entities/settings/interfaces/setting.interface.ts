import { SettingKey } from './key.enum';
import { SettingValue } from './value.interface';

export interface ISetting<Key extends SettingKey = SettingKey> {
  key: Key;

  value: SettingValue<Key>;
}
