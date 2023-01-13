import { AutoMap } from '@automapper/classes';
import {
  Collection as MikroOrmCollection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

// eslint-disable-next-line import/no-cycle
import { Service } from '../services';
// eslint-disable-next-line import/no-cycle
import { CollectionsRepository } from './collections.repository';

@Entity({ tableName: 'collections', customRepository: () => CollectionsRepository })
export class Collection {
  [EntityRepositoryType]?: CollectionsRepository;

  @PrimaryKey()
  @AutoMap()
  id!: string;

  @Property()
  @AutoMap()
  name!: string;

  @OneToMany(() => Service, (service) => service.collection)
  @AutoMap(() => [Service])
  services = new MikroOrmCollection<Service>(this);
}
