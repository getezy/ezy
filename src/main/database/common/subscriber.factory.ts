import { Mapper } from '@automapper/core';
import { EntityData, FilterQuery, MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ipcMain } from 'electron';

import { DatabaseChannel } from './constants';
import { Type } from './interaces';
import { mapper } from './mapper';

export type CustomSubscriber<Source extends object, Destination> = {
  channel: string;
  handler: (
    orm: MikroORM<SqliteDriver>,
    mapper: Mapper,
    entity: Type<Source>,
    view: Type<Destination>
  ) => (...args: any[]) => Promise<any>;
};

export class SubscriberFactory {
  static create<Source extends object, Destination>(
    orm: MikroORM<SqliteDriver>,
    entity: Type<Source>,
    view: Type<Destination>,
    customSubscribers: CustomSubscriber<Source, Destination>[] = []
  ) {
    customSubscribers.forEach((subscriber) => {
      ipcMain.handle(subscriber.channel, subscriber.handler(orm, mapper, entity, view));
    });

    ipcMain.handle(
      `${DatabaseChannel.FIND}:${entity.name.toLowerCase()}`,
      async (_event, where: FilterQuery<Source>): Promise<Destination[]> => {
        const em = orm.em.fork();

        const data = await em.find<Source>(entity, where);

        return mapper.mapArray(data, entity, view);
      }
    );

    ipcMain.handle(
      `${DatabaseChannel.FIND_ONE}:${entity.name.toLowerCase()}`,
      async (_event, where: FilterQuery<Source>): Promise<Destination | null> => {
        const em = orm.em.fork();

        const data = await em.findOne<Source>(entity, where);

        return mapper.map(data, entity, view);
      }
    );

    ipcMain.handle(
      `${DatabaseChannel.FIND_ONE_OR_FAIL}:${entity.name.toLowerCase()}`,
      async (_event, where: FilterQuery<Source>): Promise<Destination> => {
        const em = orm.em.fork();

        const data = await em.findOneOrFail<Source>(entity, where);

        return mapper.map(data, entity, view);
      }
    );

    ipcMain.handle(
      `${DatabaseChannel.UPSERT}:${entity.name.toLowerCase()}`,
      async (_event, payload: EntityData<Source>): Promise<Destination> => {
        const em = orm.em.fork();

        const data = await em.upsert<Source>(entity, payload);

        return mapper.map(data, entity, view);
      }
    );

    ipcMain.handle(
      `${DatabaseChannel.UPSERT_MANY}:${entity.name.toLowerCase()}`,
      async (_event, payload: EntityData<Source>[]): Promise<Destination[]> => {
        const em = orm.em.fork();

        const data = await em.upsertMany<Source>(entity, payload);

        return mapper.mapArray(data, entity, view);
      }
    );

    ipcMain.handle(
      `${DatabaseChannel.DELETE}:${entity.name.toLowerCase()}`,
      async (_event, where: FilterQuery<Source>): Promise<void> => {
        const em = orm.em.fork();

        await em.nativeDelete<Source>(entity, where);
      }
    );
  }
}
