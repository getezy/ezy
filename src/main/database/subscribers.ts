import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ipcMain } from 'electron';

import { Settings } from './entities/settings.entity';

export const registerDatabaseSubscribers = (orm: MikroORM<SqliteDriver>) => {
  ipcMain.handle('db:get', async (_event, key: string) => {
    const em = orm.em.fork();

    const theme = await em.findOne(Settings, { key });

    console.log('GET: ', key, theme?.value);
    return theme;
  });

  ipcMain.handle('db:update', async (_event, payload: { key: string; value: any }) => {
    console.log('UPDATE: ', payload);
    const em = orm.em.fork();

    await em.upsert(Settings, payload);
  });

  ipcMain.handle('db:remove', async (_event, key: string) => {
    console.log('REMOVE: ', key);
    const em = orm.em.fork();

    await em.nativeDelete(Settings, { key });
  });
};
