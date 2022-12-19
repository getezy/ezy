import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';

// eslint-disable-next-line import/no-cycle
import { SettingsRepository } from './settings.repository';

@Entity({ tableName: 'settings', customRepository: () => SettingsRepository })
export class Settings {
  [EntityRepositoryType]?: SettingsRepository;

  @PrimaryKey({ type: 'text' })
  key!: string;

  @Property({ type: 'text' })
  value!: string;
}
