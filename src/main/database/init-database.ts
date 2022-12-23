import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import { DATABSE_PATH } from './database-path';
import { Environment, Setting } from './entities';
import { knex } from './knex';

export async function initDatabase() {
  await knex.migrate.up();

  const orm = await MikroORM.init<SqliteDriver>({
    entities: [Setting, Environment],
    dbName: DATABSE_PATH,
    type: 'sqlite',
  });

  return orm;
}
