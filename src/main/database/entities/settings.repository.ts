import { EntityRepository } from '@mikro-orm/sqlite';

import { Settings } from './settings.entity';

export class SettingsRepository extends EntityRepository<Settings> {}
