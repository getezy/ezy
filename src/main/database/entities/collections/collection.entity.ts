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
import { Collection as ICollection } from './interfaces';

@Entity({ tableName: 'collections', customRepository: () => CollectionsRepository })
export class Collection implements ICollection {
  [EntityRepositoryType]?: CollectionsRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @OneToMany(() => Service, (service) => service.collection)
  services = new MikroOrmCollection<Service>(this);
}
