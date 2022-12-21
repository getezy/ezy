import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { Settings } from './settings.entity';

export class SettingsRepository extends EntityRepository<Settings> {}
