import { AutoMap } from '@automapper/classes';
import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';

// eslint-disable-next-line import/no-cycle
import { EnvironmentsRepository } from './environments.repository';

@Entity({ tableName: 'environments', customRepository: () => EnvironmentsRepository })
export class Environment {
  [EntityRepositoryType]?: EnvironmentsRepository;

  @PrimaryKey()
  @AutoMap()
  id!: string;

  @Property()
  @AutoMap()
  label!: string;

  @Property()
  @AutoMap()
  url!: string;

  @Property()
  @AutoMap()
  color!: string;
}
