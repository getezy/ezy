import { EntityData, FilterQuery, Loaded } from '@mikro-orm/core';
import { ipcRenderer } from 'electron';

import { DatabaseChannel } from '../constants';
import { Type } from './type.interface';

export function preload<T>(entity: Type<T>) {
  return {
    find(where?: FilterQuery<T>): Promise<Loaded<T, never>[]> {
      return ipcRenderer.invoke(`${DatabaseChannel.FIND}:${entity.name.toLowerCase()}`, where);
    },

    findOne(where: FilterQuery<T>): Promise<Loaded<T, never> | null> {
      return ipcRenderer.invoke(`${DatabaseChannel.FIND_ONE}:${entity.name.toLowerCase()}}`, where);
    },

    findOneOrFail(where: FilterQuery<T>): Promise<Loaded<T, never>> {
      return ipcRenderer.invoke(
        `${DatabaseChannel.FIND_ONE_OR_FAIL}:${entity.name.toLowerCase()}`,
        where
      );
    },

    upsert(payload: EntityData<T>): Promise<void> {
      return ipcRenderer.invoke(`${DatabaseChannel.UPSERT}:${entity.name.toLowerCase()}`, payload);
    },

    delete(where: FilterQuery<T>): Promise<void> {
      return ipcRenderer.invoke(`${DatabaseChannel.DELETE}:${entity.name.toLowerCase()}`, where);
    },
  };
}
