import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { app } from 'electron';
import path from 'path';

import { Settings } from './entities/settings.entity';

export async function initDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'ezy.db');

  const orm = await MikroORM.init<SqliteDriver>({
    entities: [Settings],
    dbName: dbPath,
    type: 'sqlite',
  });

  return orm;
}
