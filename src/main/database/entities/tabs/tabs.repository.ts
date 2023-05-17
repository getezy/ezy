import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { Tab } from './tab.entity';

export class TabsRepository extends EntityRepository<Tab> {}
