import create from 'zustand';
import { persist } from 'zustand/middleware';

import { EnvironmentsStorage } from './interfaces';

export const useEnvironmentsStore = create(
  persist<EnvironmentsStorage>(
    (set, get) => ({
      environments: [],
      createEnvironment: (environment) =>
        set((state) => {
          const { environments } = get();

          environments.push(environment);

          return { ...state, environments: [...environments] };
        }),
      removeEnvironment: (id) =>
        set((state) => {
          const { environments } = get();
          return { ...state, environments: environments.filter((item) => item.value !== id) };
        }),
    }),
    {
      name: 'environments',
      getStorage: () => window.electron.store,
    }
  )
);
