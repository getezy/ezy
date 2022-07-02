import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { CollectionsStorage } from './interfaces';

export const useCollectionsStore = create(
  persist<CollectionsStorage>(
    (set, get) => ({
      collections: [],
      createCollection: (collection) =>
        set((state) => {
          const { collections } = get();

          collections.push({ ...collection, id: nanoid() });

          return { ...state, collections: [...collections] };
        }),
      updateCollection: (id, payload) =>
        set((state) => {
          const { collections } = get();
          const collectionIndex = collections.findIndex((item) => item.id === id);

          if (collectionIndex >= 0) {
            return {
              ...state,
              collections: [
                ...collections.slice(0, collectionIndex),
                {
                  ...collections[collectionIndex],
                  ...payload,
                },
                ...collections.slice(collectionIndex + 1),
              ],
            };
          }

          return { ...state };
        }),
      removeCollection: (id) =>
        set((state) => {
          const { collections } = get();
          return {
            ...state,
            collections: collections.filter((item) => item.id !== id),
          };
        }),
    }),
    {
      name: 'collections',
      getStorage: () => window.electron.store,
    }
  )
);
