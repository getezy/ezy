import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Collection, CollectionsStorage, CollectionType, GRPCMethodType } from './interfaces';

const initialState: Collection<CollectionType>[] = [
  {
    id: 'testid',
    name: 'Backend',
    type: CollectionType.GRPC,
    children: [
      {
        id: 'testservice',
        name: 'FirstService',
        methods: [
          {
            id: 'testunary',
            type: GRPCMethodType.UNARY,
            name: 'get',
          },
          {
            id: 'teststream',
            type: GRPCMethodType.STREAM,
            name: 'getStreamgetStreamgetStreamgetStreamgetStreamgetStream',
          },
        ],
      },
      {
        id: 'testservicesecond',
        name: 'SecondService',
        methods: [
          {
            id: 'testunary',
            type: GRPCMethodType.UNARY,
            name: 'get',
          },
          {
            id: 'teststream',
            type: GRPCMethodType.STREAM,
            name: 'getStreamgetStreamgetStreamgetStreamgetStreamgetStream',
          },
        ],
      },
    ],
  },
];

export const useCollectionsStore = create(
  persist<CollectionsStorage>(
    (set, get) => ({
      collections: initialState,
      createCollection: (collection) =>
        set((state) => {
          const { collections } = get();

          collections.push({ ...collection, id: nanoid() });

          return { ...state, collections: [...collections] };
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
