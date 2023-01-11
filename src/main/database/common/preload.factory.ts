import { EntityData, FilterQuery } from '@mikro-orm/core';
import { ipcRenderer } from 'electron';

import { DatabaseChannel } from './constants';
import { Type } from './interaces';

export class PreloadFactory {
  static create<Source, Destination>(entity: Type<Source>) {
    return {
      find(where: FilterQuery<Source>): Promise<Destination[]> {
        return ipcRenderer.invoke(`${DatabaseChannel.FIND}:${entity.name.toLowerCase()}`, where);
      },

      findOne(where: FilterQuery<Source>): Promise<Destination | null> {
        return ipcRenderer.invoke(
          `${DatabaseChannel.FIND_ONE}:${entity.name.toLowerCase()}}`,
          where
        );
      },

      findOneOrFail(where: FilterQuery<Source>): Promise<Destination> {
        return ipcRenderer.invoke(
          `${DatabaseChannel.FIND_ONE_OR_FAIL}:${entity.name.toLowerCase()}`,
          where
        );
      },

      upsert(payload: EntityData<Source>): Promise<void> {
        return ipcRenderer.invoke(
          `${DatabaseChannel.UPSERT}:${entity.name.toLowerCase()}`,
          payload
        );
      },

      delete(where: FilterQuery<Source>): Promise<void> {
        return ipcRenderer.invoke(`${DatabaseChannel.DELETE}:${entity.name.toLowerCase()}`, where);
      },
    };
  }
}
