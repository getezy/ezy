import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import {
  Collection,
  CollectionChildren,
  CollectionsStorage,
  CollectionType,
  GRPCMethod,
} from './interfaces';

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
      filterCollection(search) {
        const { collections } = get();

        return collections.reduce((acc: Collection<CollectionType>[], collection) => {
          if (collection.type === CollectionType.GRPC) {
            const filteredServices = collection.children.reduce(
              (children: CollectionChildren<CollectionType.GRPC>, service) => {
                const filteredMethods = service.methods.reduce((methods: GRPCMethod[], method) => {
                  if (method.name.toLowerCase().includes(search)) {
                    methods.push(method);
                  }

                  return methods;
                }, []);

                if (filteredMethods.length || service.name.toLowerCase().includes(search)) {
                  children.push({
                    ...service,
                    methods: filteredMethods,
                  });
                }

                return children;
              },
              []
            );

            if (filteredServices.length || collection.name.toLowerCase().includes(search)) {
              acc.push({
                ...collection,
                children: filteredServices,
              });
            }
          }

          return acc;
        }, []);
      },
    }),
    {
      name: 'collections',
      getStorage: () => window.electron.store,
    }
  )
);
