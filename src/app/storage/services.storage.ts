import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { ServicesStorage } from './interfaces';

export const useServicesStore = create(
  persist<ServicesStorage>(
    (set, get) => ({
      services: [],
      create: (service) =>
        set((state) => {
          const { services } = get();

          services.push({ ...service, id: nanoid() });

          return { ...state, services: [...services] };
        }),
      remove: (id) =>
        set((state) => {
          const { services } = get();
          return {
            ...state,
            services: services.filter((item) => item.id !== id),
          };
        }),
    }),
    {
      name: 'services',
      getStorage: () => window.electron.store,
    }
  )
);
