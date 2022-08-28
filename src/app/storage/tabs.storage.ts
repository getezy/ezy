/* eslint-disable no-param-reassign */

import { arrayMove } from '@dnd-kit/sortable';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { GrpcTlsType } from '../../core/clients/grpc/interfaces';
import { GrpcMethodType } from '../../core/protobuf/interfaces';
import {
  CollectionType,
  GrpcProtocol,
  GrpcTab,
  isGrpcTabBidirectionalStreaming,
  isGrpcTabClientStreaming,
  isGrpcTabServerStreaming,
  TabsStorage,
} from './interfaces';
import { useTlsPresetsStore } from './tls-presets.storage';

const closeTab = (id: string | undefined) =>
  produce<TabsStorage>((state) => {
    if (id) {
      const closedTabIndex = state.tabs.findIndex((tab) => tab.id === id);

      if (state.activeTabId === id) {
        state.activeTabId =
          state.tabs[closedTabIndex + 1]?.id || state.tabs[closedTabIndex - 1]?.id;
      }

      state.tabs.splice(closedTabIndex, 1);
    }
  });

export const useTabsStore = create(
  persist<TabsStorage>(
    (set, get) => ({
      tabs: [],
      activeTabId: undefined,
      closeAllTabs: () =>
        set(
          produce<TabsStorage>((state) => {
            state.tabs = [];
            state.activeTabId = undefined;
          })
        ),
      closeActiveTab: () => set(closeTab(get().activeTabId)),
      closeTab: (id) => set(closeTab(id)),
      activateTab: (id) =>
        set(
          produce<TabsStorage>((state) => {
            state.activeTabId = id;
          })
        ),
      moveTab: (currentId, overId) =>
        set(
          produce<TabsStorage>((state) => {
            const oldIndex = state.tabs.findIndex((item) => item.id === currentId);
            const newIndex = state.tabs.findIndex((item) => item.id === overId);

            state.tabs = arrayMove(state.tabs, oldIndex, newIndex);
          })
        ),

      createGrpcTab: (payload) =>
        set(
          produce<TabsStorage>((state) => {
            const tabId = nanoid();
            const requestTabId = nanoid();

            const tls = useTlsPresetsStore
              .getState()
              .presets.find((item) => item.system && item.tls.type === GrpcTlsType.INSECURE);

            const tab: GrpcTab<GrpcMethodType> = {
              ...payload,
              id: tabId,
              data: {
                protocol: GrpcProtocol.GRPC,
                requestTabs: {
                  activeTabId: requestTabId,
                  request: { id: requestTabId },
                  metadata: { id: nanoid() },
                },
                response: { id: nanoid() },
                tlsId: tls?.id,
              },
            };

            state.tabs.push(tab);

            state.activeTabId = tabId;
          })
        ),
      updateGrpcTabData: (id, data) =>
        set(
          produce<TabsStorage>((state) => {
            const index = state.tabs.findIndex((item) => item.id === id);

            if (index !== -1) {
              state.tabs[index].data = {
                ...state.tabs[index].data,
                ...data,
              };
            }
          })
        ),
      updateGrpcTabsEnvironment: (currentEnvironmentId, newEnvironmentId) =>
        set(
          produce<TabsStorage>((state) => {
            for (let i = 0; i < state.tabs.length; i++) {
              if (
                state.tabs[i].type === CollectionType.GRPC &&
                state.tabs[i].data.environmentId === currentEnvironmentId
              ) {
                state.tabs[i].data = {
                  ...state.tabs[i].data,
                  environmentId: newEnvironmentId,
                };
              }
            }
          })
        ),
      addGrpcStreamMessage: (id, message, forceClear) =>
        set(
          produce<TabsStorage>((state) => {
            const index = state.tabs.findIndex((tab) => tab.id === id);
            if (index !== -1) {
              const tab = state.tabs[index];
              if (
                isGrpcTabServerStreaming(tab) ||
                isGrpcTabClientStreaming(tab) ||
                isGrpcTabBidirectionalStreaming(tab)
              ) {
                const messages = forceClear ? [] : tab.data.response.messages || [];

                messages.push({
                  id: nanoid(),
                  ...message,
                });

                tab.data.response.messages = messages;
              }
            }
          })
        ),
    }),
    {
      name: 'tabs',
      getStorage: () => window.electronStore,
    }
  )
);
