import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import { subscribers } from './common';
import { Collection, Environment, Setting, TlsPreset } from './entities';

export const registerDatabaseSubscribers = (orm: MikroORM<SqliteDriver>) => {
  subscribers(orm, Setting);
  subscribers(orm, Environment);
  subscribers(orm, TlsPreset);
  subscribers(orm, Collection);
};
