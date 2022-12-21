import { EntityData, FilterQuery, Loaded } from '@mikro-orm/core';
import { ipcRenderer } from 'electron';

import { DatabaseChannel } from './constants';
import { Settings } from './entities';

export const Database = {
  settings: {
    find(where: FilterQuery<Settings>): Promise<Loaded<Settings, never>[]> {
      return ipcRenderer.invoke(DatabaseChannel.FIND, where);
    },

    findOne(where: FilterQuery<Settings>): Promise<Loaded<Settings, never> | null> {
      return ipcRenderer.invoke(DatabaseChannel.FIND_ONE, where);
    },

    upsert(payload: EntityData<Settings>): Promise<void> {
      return ipcRenderer.invoke(DatabaseChannel.UPSERT, payload);
    },

    delete(where: FilterQuery<Settings>): Promise<void> {
      return ipcRenderer.invoke(DatabaseChannel.DELETE, where);
    },
  },
};
