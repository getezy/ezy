import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { app } from 'electron';
import Knex from 'knex';
import path from 'path';

import { Settings } from './entities/settings.entity';

const dbPath = path.join(app.getPath('userData'), 'ezy.db');

const knex = Knex({
  client: 'sqlite',
  connection: {
    filename: dbPath,
  },
  migrations: {
    directory: path.join(__dirname, './migrations'),
    tableName: 'migrations',
  },
});

export async function initDatabase() {
  const orm = await MikroORM.init<SqliteDriver>({
    entities: [Settings],
    dbName: dbPath,
    type: 'sqlite',
  });

  return orm;
}
