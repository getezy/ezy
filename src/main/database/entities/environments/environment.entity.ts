import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';

// eslint-disable-next-line import/no-cycle
import { EnvironmentRepository } from './environment.repository';
import { Environment as IEnvironment } from './interfaces';

@Entity({ tableName: 'environments', customRepository: () => EnvironmentRepository })
export class Environment implements IEnvironment {
  [EntityRepositoryType]?: EnvironmentRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  label!: string;

  @Property()
  url!: string;

  @Property()
  color!: string;
}
