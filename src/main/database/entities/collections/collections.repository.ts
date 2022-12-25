import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { Collection } from './collection.entity';

export class CollectionsRepository extends EntityRepository<Collection> {}
