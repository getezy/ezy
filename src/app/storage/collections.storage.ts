/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { useNotification } from '../components';
import {
  Collection,
  CollectionChildren,
  CollectionsStorage,
  CollectionType,
  GrpcMethod,
  GrpcService,
} from './interfaces';
import { useLogsStore } from './logs.storage';
import { useTabsStore } from './tabs.storage';

export const useCollectionsStore = create(
  persist<CollectionsStorage>(
    (set, get) => ({
      collections: [],
      createCollection: async (collection) => {
        if (collection.type === CollectionType.GRPC) {
          try {
            const proto = await window.protobuf.loadFromFile(collection.options);

            set(
              produce<CollectionsStorage>((state) => {
                state.collections.push({
                  ...collection,
                  id: nanoid(),
                  children: proto.map((service) => ({
                    ...service,
                    id: nanoid(),
                    methods: (service.methods || []).map((method) => ({ ...method, id: nanoid() })),
                  })),
                });
              })
            );
          } catch (error: any) {
            useLogsStore.getState().createLog({ message: error?.message });
          }
        }
      },
      updateCollection: async (id, collection) => {
        if (collection.type === CollectionType.GRPC) {
          try {
            const methodIds: string[] = [];
            const proto = await window.protobuf.loadFromFile(collection.options);

            set(
              produce<CollectionsStorage>((state) => {
                const index = state.collections.findIndex((item) => item.id === id);

                if (index !== -1) {
                  state.collections[index] = {
                    ...state.collections[index],
                    ...collection,
                    children: proto.reduce((services, service) => {
                      const oldChildren = state.collections[index].children || [];
                      const oldService = oldChildren.find((item) => item.name === service.name);

                      services.push({
                        id: oldService?.id || nanoid(),
                        ...service,
                        methods: service.methods?.reduce((methods, method) => {
                          const methodId =
                            oldService?.methods?.find((item) => item.name === method.name)?.id ||
                            nanoid();

                          methods.push({
                            id: methodId,
                            ...method,
                          });

                          methodIds.push(methodId);

                          return methods;
                        }, [] as GrpcMethod[]),
                      });

                      return services;
                    }, [] as GrpcService[]),
                  };
                }
              })
            );

            const { tabs, closeTab } = useTabsStore.getState();
            for (let i = 0; i < tabs.length; i++) {
              if (
                tabs[i].info?.collectionId === id &&
                !methodIds.includes(tabs[i].info?.methodId)
              ) {
                closeTab(tabs[i].id);
              }
            }
          } catch (error: any) {
            useLogsStore.getState().createLog({ message: error?.message });
            // TODO: Stop using hooks here
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { notification } = useNotification();
            notification(
              {
                title: `Synchronize "${collection.name}" collection error`,
                desctiption: error?.message,
              },
              { type: 'error' }
            );
          }
        }
      },
      removeCollection: (id) =>
        set(
          produce<CollectionsStorage>((state) => {
            const index = state.collections.findIndex((collection) => collection.id === id);
            state.collections.splice(index, 1);
          })
        ),
      filterCollections(search) {
        const { collections } = get();

        return collections.reduce((acc: Collection<CollectionType>[], collection) => {
          if (collection.type === CollectionType.GRPC) {
            const filteredServices = (collection.children || []).reduce(
              (children: CollectionChildren<CollectionType.GRPC>, service) => {
                const filteredMethods = (service.methods || []).reduce(
                  (methods: GrpcMethod[], method) => {
                    if (method.name.toLowerCase().includes(search)) {
                      methods.push(method);
                    }

                    return methods;
                  },
                  []
                );

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
      getStorage: () => window.electronStore,
    }
  )
);
