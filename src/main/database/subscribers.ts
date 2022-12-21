import { EntityData, FilterQuery, Loaded, MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ipcMain } from 'electron';

import { DatabaseChannel } from './constants';
import { Settings } from './entities';

export const registerDatabaseSubscribers = (orm: MikroORM<SqliteDriver>) => {
  ipcMain.handle(
    DatabaseChannel.FIND,
    (_event, where: FilterQuery<Settings>): Promise<Loaded<Settings, never>[]> => {
      const em = orm.em.fork();

      return em.find(Settings, where);
    }
  );

  ipcMain.handle(
    DatabaseChannel.FIND_ONE,
    (_event, where: FilterQuery<Settings>): Promise<Loaded<Settings, never> | null> => {
      const em = orm.em.fork();

      return em.findOne(Settings, where);
    }
  );

  ipcMain.handle(
    DatabaseChannel.UPSERT,
    async (_event, payload: EntityData<Settings>): Promise<void> => {
      const em = orm.em.fork();

      await em.upsert(Settings, payload);
    }
  );

  ipcMain.handle(
    DatabaseChannel.DELETE,
    async (_event, where: FilterQuery<Settings>): Promise<void> => {
      const em = orm.em.fork();

      await em.nativeDelete(Settings, where);
    }
  );
};
