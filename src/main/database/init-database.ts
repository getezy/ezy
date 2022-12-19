import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import { DATABSE_PATH } from './constants';
import { Settings } from './entities/settings.entity';
import { knex } from './knex';

export async function initDatabase() {
  await knex.migrate.up();

  const orm = await MikroORM.init<SqliteDriver>({
    entities: [Settings],
    dbName: DATABSE_PATH,
    type: 'sqlite',
  });

  return orm;
}
