import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { Setting } from './setting.entity';

export class SettingsRepository extends EntityRepository<Setting> {}
