/* eslint-disable no-param-reassign */

import { produce } from 'immer';
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
        set(
          produce<CollectionsStorage>((state) => {
            state.collections.push({
              ...collection,
              id: nanoid(),
              children: collection.children.map((service) => ({
                ...service,
                id: nanoid(),
                methods: service.methods.map((method) => ({ ...method, id: nanoid() })),
              })),
            });
          })
        ),
      updateCollection: (id, payload) =>
        set(
          produce<CollectionsStorage>((state) => {
            const index = state.collections.findIndex((item) => item.id === id);

            if (index !== -1) {
              state.collections[index] = {
                ...state.collections[index],
                ...payload,
              };
            }
          })
        ),
      removeCollection: (id) =>
        set(
          produce<CollectionsStorage>((state) => {
            const index = state.collections.findIndex((collection) => collection.id === id);
            state.collections.splice(index, 1);
          })
        ),
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
