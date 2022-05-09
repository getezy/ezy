import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Environment, EnvironmentsStorage } from './interfaces';

const initialState: Environment[] = [];

export const useEnvironmentsStore = create(
  persist<EnvironmentsStorage>(
    () => ({
      environments: initialState,
    }),
    {
      name: 'environments',
      getStorage: () => window.electron.store,
    }
  )
);
