import { EntityData, FilterQuery, Loaded, MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ipcMain } from 'electron';

import { DatabaseChannel } from './constants';
import { Type } from './interaces';

export function subscribers<T>(orm: MikroORM<SqliteDriver>, entity: Type<T>) {
  ipcMain.handle(
    `${DatabaseChannel.FIND}:${entity.name.toLowerCase()}`,
    (_event, where?: FilterQuery<T>): Promise<Loaded<T, never>[]> => {
      const em = orm.em.fork();

      return em.find(entity, where);
    }
  );

  ipcMain.handle(
    `${DatabaseChannel.FIND_ONE}:${entity.name.toLowerCase()}`,
    (_event, where: FilterQuery<T>): Promise<Loaded<T, never> | null> => {
      const em = orm.em.fork();

      return em.findOne(entity, where);
    }
  );

  ipcMain.handle(
    `${DatabaseChannel.FIND_ONE_OR_FAIL}:${entity.name.toLowerCase()}`,
    (_event, where: FilterQuery<T>): Promise<Loaded<T, never>> => {
      const em = orm.em.fork();

      return em.findOneOrFail(entity, where);
    }
  );

  ipcMain.handle(
    `${DatabaseChannel.UPSERT}:${entity.name.toLowerCase()}`,
    async (_event, payload: EntityData<T>): Promise<void> => {
      const em = orm.em.fork();

      await em.upsert(entity, payload);
    }
  );

  ipcMain.handle(
    `${DatabaseChannel.DELETE}:${entity.name.toLowerCase()}`,
    async (_event, where: FilterQuery<T>): Promise<void> => {
      const em = orm.em.fork();

      await em.nativeDelete(entity, where);
    }
  );
}
