import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { TlsPreset } from './tls-preset.entity';

export class TlsPresetsRepository extends EntityRepository<TlsPreset> {}
