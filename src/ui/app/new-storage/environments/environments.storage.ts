/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { create } from 'zustand';

import { LocalAPI } from '@api';

import { EnvironmentsStorage } from './environments.interface';

export const useEnvironmentsStore = create<EnvironmentsStorage>((set) => ({
  environments: [],

  fetch: async () => {
    const environments = await LocalAPI.environments.fetch();

    set(
      produce<EnvironmentsStorage>((state) => {
        state.environments = environments;
      })
    );
  },

  create: async (environment) => {
    await LocalAPI.environments.upsert(environment);
    const environments = await LocalAPI.environments.fetch();

    set(
      produce<EnvironmentsStorage>((state) => {
        state.environments = environments;
      })
    );
  },

  remove: async (id) => {
    await LocalAPI.environments.remove(id);
    const environments = await LocalAPI.environments.fetch();

    set(
      produce<EnvironmentsStorage>((state) => {
        state.environments = environments;
      })
    );
  },
}));
