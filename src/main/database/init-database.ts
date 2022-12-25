import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import { DATABSE_PATH } from './common/database-path';
import { knex } from './common/knex';
import { Collection, Environment, Service, Setting, TlsPreset } from './entities';

export async function initDatabase() {
  await knex.migrate.up();

  const orm = await MikroORM.init<SqliteDriver>({
    entities: [Setting, Environment, TlsPreset, Collection, Service],
    dbName: DATABSE_PATH,
    type: 'sqlite',
  });

  return orm;
}
