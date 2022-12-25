import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { Service } from './service.entity';

export class ServicesRepository extends EntityRepository<Service> {}
