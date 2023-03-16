import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import { DATABSE_PATH } from './common/database-path';
import { knex } from './common/knex';
import { Environment, Setting, Tab, TlsPreset } from './entities';

export async function initDatabase() {
  await knex.migrate.up();

  const orm = await MikroORM.init<SqliteDriver>({
    entities: [Setting, Environment, TlsPreset, Tab],
    dbName: DATABSE_PATH,
    type: 'sqlite',
  });

  return orm;
}
