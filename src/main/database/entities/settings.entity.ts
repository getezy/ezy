import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({ tableName: 'settings' })
export class Settings {
  @PrimaryKey()
  id!: string;
}
