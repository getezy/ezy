import { produce } from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { EnvironmentsStorage } from './interfaces';

export const useEnvironmentsStore = create(
  persist<EnvironmentsStorage>(
    (set) => ({
      environments: [],
      createEnvironment: (environment) =>
        set(
          produce<EnvironmentsStorage>((state) => {
            state.environments.push(environment);
          })
        ),
      removeEnvironment: (id) =>
        set(
          produce<EnvironmentsStorage>((state) => {
            const index = state.environments.findIndex((environment) => environment.value === id);
            if (index !== -1) state.environments.splice(index, 1);
          })
        ),
    }),
    {
      name: 'environments',
      getStorage: () => window.electron.store,
    }
  )
);
