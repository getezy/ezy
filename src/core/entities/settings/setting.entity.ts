import { AutoMap } from '@automapper/classes';

import type { ISetting, SettingKey, SettingValue } from './interfaces';

export class Setting<Key extends SettingKey = SettingKey> implements ISetting<Key> {
  @AutoMap()
  key: Key;

  @AutoMap()
  value: SettingValue<Key>;

  constructor({ key, value }: ISetting<Key>) {
    this.key = key;
    this.value = value;
  }
}
