import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Collection, CollectionsStorage, CollectionType } from './interfaces';

export const useCollectionsStore = create(
  persist<CollectionsStorage>(
    (set, get) => ({
      collections: [],
      createCollection: (collection) =>
        set((state) => {
          const { collections } = get();

          const newCollection: Collection<CollectionType> = {
            ...collection,
            id: nanoid(),
            children: collection.children.map((service) => ({
              ...service,
              id: nanoid(),
              methods: service.methods.map((method) => ({ ...method, id: nanoid() })),
            })),
          };

          collections.push(newCollection);

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
