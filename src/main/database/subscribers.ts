import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import { subscribers } from './common';
import { Environment, Settings } from './entities';

export const registerDatabaseSubscribers = (orm: MikroORM<SqliteDriver>) => {
  subscribers(orm, Settings);
  subscribers(orm, Environment);
};
