/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import create from 'zustand';

import { LocalAPI } from '@api';

import { EnvironmentsStorage } from './environments.interface';

export const useEnvironmentsStore = create<EnvironmentsStorage>((set) => ({
  environments: [],

  fetch: async () => {
    const data = await LocalAPI.environments.fetch();

    set(
      produce<EnvironmentsStorage>((state) => {
        state.environments = data;
      })
    );
  },

  createEnvironment: async (environment) => {
    await LocalAPI.environments.upsert(environment);
    const data = await LocalAPI.environments.fetch();

    set(
      produce<EnvironmentsStorage>((state) => {
        state.environments = data;
      })
    );
  },

  removeEnvironment: async (id) => {
    await LocalAPI.environments.remove(id);
    const data = await LocalAPI.environments.fetch();

    set(
      produce<EnvironmentsStorage>((state) => {
        state.environments = data;
      })
    );
  },
}));
