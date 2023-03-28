/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { LocalAPI } from '@api';

import { AppStorage } from '../app.interface';
import { EnvironmentsStorageSlice } from './environments.interface';

export const createEnvironmentsSlice: StateCreator<AppStorage, [], [], EnvironmentsStorageSlice> = (
  set
) => ({
  environments: [],

  fetchEnvironments: async () => {
    const environments = await LocalAPI.environments.fetch();

    set(
      produce<AppStorage>((state) => {
        state.environments = environments;
      })
    );
  },

  createEnvironment: async (environment) => {
    await LocalAPI.environments.upsert(environment);
    const environments = await LocalAPI.environments.fetch();

    set(
      produce<AppStorage>((state) => {
        state.environments = environments;
      })
    );
  },

  removeEnvironment: async (id) => {
    await LocalAPI.environments.remove(id);
    const environments = await LocalAPI.environments.fetch();

    set(
      produce<AppStorage>((state) => {
        state.environments = environments;
      })
    );
  },
});
