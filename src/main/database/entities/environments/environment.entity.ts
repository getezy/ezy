import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';

// eslint-disable-next-line import/no-cycle
import { EnvironmentsRepository } from './environments.repository';
import { Environment as IEnvironment } from './interfaces';

@Entity({ tableName: 'environments', customRepository: () => EnvironmentsRepository })
export class Environment implements IEnvironment {
  [EntityRepositoryType]?: EnvironmentsRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  label!: string;

  @Property()
  url!: string;

  @Property()
  color!: string;
}
