import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { Environment } from './environment.entity';

export class EnvironmentsRepository extends EntityRepository<Environment> {}
