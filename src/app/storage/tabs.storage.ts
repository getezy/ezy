/* eslint-disable no-param-reassign */

import { arrayMove } from '@dnd-kit/sortable';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { CollectionType, isGrpcTabServerStreamingCall, TabsStorage } from './interfaces';

export const useTabsStore = create(
  persist<TabsStorage>(
    (set) => ({
      tabs: [],
      activeTabId: undefined,
      closeTab: (id) =>
        set(
          produce<TabsStorage>((state) => {
            const closedTabIndex = state.tabs.findIndex((tab) => tab.id === id);

            if (state.activeTabId === id) {
              state.activeTabId =
                state.tabs[closedTabIndex + 1]?.id || state.tabs[closedTabIndex - 1]?.id;
            }

            state.tabs.splice(closedTabIndex, 1);
          })
        ),
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

            state.tabs.push({
              ...payload,
              id: tabId,
              data: {
                requestTabs: {
                  activeTabId: requestTabId,
                  request: { id: requestTabId },
                  metadata: { id: nanoid() },
                },
                response: { id: nanoid() },
              },
            });

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
      addGrpcStreamMessage: (id, message) =>
        set(
          produce<TabsStorage>((state) => {
            const index = state.tabs.findIndex((tab) => tab.id === id);
            if (index !== -1) {
              const tab = state.tabs[index];
              if (isGrpcTabServerStreamingCall(tab)) {
                const messages = tab.data.response.messages || [];
                messages.unshift(message);
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
