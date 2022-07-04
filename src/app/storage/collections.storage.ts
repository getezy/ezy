import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Collection, CollectionsStorage, CollectionType, GRPCMethodType } from './interfaces';

const collectionsInit: Collection<CollectionType>[] = [
  {
    id: nanoid(),
    name: 'Backend',
    type: CollectionType.GRPC,
    options: {
      path: 'test',
      includeDirs: [],
    },
    children: [
      {
        id: nanoid(),
        name: 'simple_package',
        services: [
          {
            id: nanoid(),
            name: 'SimpleService',
            methods: [
              {
                id: nanoid(),
                name: 'SimpleUnaryRequest',
                type: GRPCMethodType.UNARY,
              },
              {
                id: nanoid(),
                name: 'SimpleStreamRequest',
                type: GRPCMethodType.STREAM,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const useCollectionsStore = create(
  persist<CollectionsStorage>(
    (set, get) => ({
      collections: collectionsInit,
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
