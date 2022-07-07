/* eslint-disable no-param-reassign */

import { arrayMove } from '@dnd-kit/sortable';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { TabsStorage } from './interfaces';

export const useTabsStore = create(
  persist<TabsStorage>(
    (set) => ({
      tabs: [],
      activeTabId: undefined,
      createTab: (tab) =>
        set(
          produce<TabsStorage>((state) => {
            const tabId = nanoid();
            const requestTabId = nanoid();

            state.tabs.push({
              ...tab,
              id: tabId,
              environmentId: null,
              url: '',
              requestContainer: {
                activeTabId: requestTabId,
                request: { id: requestTabId },
                metadata: { id: nanoid() },
              },
              response: { id: nanoid() },
            });

            state.activeTabId = tabId;
          })
        ),
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
      updateTab: (tab) =>
        set(
          produce<TabsStorage>((state) => {
            const index = state.tabs.findIndex((item) => item.id === tab.id);

            if (index !== -1) {
              state.tabs[index] = {
                ...state.tabs[index],
                ...tab,
              };
            }
          })
        ),
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
