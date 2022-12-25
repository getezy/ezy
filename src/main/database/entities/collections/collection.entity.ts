import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';

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
}
