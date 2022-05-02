import create from 'zustand';
import { persist } from 'zustand/middleware';

import { ServicesStorage } from './interfaces';

export const useServicesStore = create<ServicesStorage>(
  // @ts-ignore
  persist(
    () => ({
      services: [],
    }),
    {
      name: 'services',
      getStorage: () => window.electron.store,
    }
  )
);
