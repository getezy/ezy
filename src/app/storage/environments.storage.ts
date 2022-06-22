import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Environment, EnvironmentsStorage } from './interfaces';

const initialState: Environment[] = [];

export const useEnvironmentsStore = create(
  persist<EnvironmentsStorage>(
    (set, get) => ({
      environments: initialState,
      createEnvironment: (tab) =>
        set((state) => {
          const { environments } = get();

          environments.push({ ...tab, id: nanoid() });

          return { ...state, environments: [...environments] };
        }),
      removeEnvironment: (id) =>
        set((state) => {
          const { environments } = get();
          return { ...state, environments: environments.filter((item) => item.id !== id) };
        }),
    }),
    {
      name: 'environments',
      getStorage: () => window.electron.store,
    }
  )
);
