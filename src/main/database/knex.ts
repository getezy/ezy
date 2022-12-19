import Knex from 'knex';
import path from 'path';

import { DATABSE_PATH } from './constants';

export const knex = Knex({
  client: 'sqlite',
  connection: {
    filename: DATABSE_PATH,
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations',
    directory: path.join(__dirname, './migrations'),
  },
});
