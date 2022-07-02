import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { TabsStorage } from './interfaces';

export const useTabsStore = create(
  persist<TabsStorage>(
    (set, get) => ({
      tabs: [],
      activeTabId: undefined,
      createTab: (tab) =>
        set((state) => {
          const { tabs } = get();

          const tabId = nanoid();
          const requestTabId = nanoid();

          tabs.push({
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

          return { ...state, activeTabId: tabId, tabs: [...tabs] };
        }),
      closeTab: (id) =>
        set((state) => {
          const { tabs, activeTabId } = get();

          const closedTabIndex = tabs.findIndex((tab) => tab.id === id);

          return {
            ...state,
            tabs: tabs.filter((item) => item.id !== id),
            activeTabId:
              id === activeTabId
                ? tabs[closedTabIndex + 1]?.id || tabs[closedTabIndex - 1]?.id
                : activeTabId,
          };
        }),
      activateTab: (id) => set((state) => ({ ...state, activeTabId: id })),
      moveTab: (currentId, overId) =>
        set((state) => {
          const { tabs } = get();

          const oldIndex = tabs.findIndex((item) => item.id === currentId);
          const newIndex = tabs.findIndex((item) => item.id === overId);

          return { ...state, tabs: arrayMove(tabs, oldIndex, newIndex) };
        }),
      updateTab: (tab) =>
        set((state) => {
          const { tabs } = get();

          const currentTabIndex = tabs.findIndex((item) => item.id === tab.id);

          if (currentTabIndex >= 0) {
            return {
              ...state,
              tabs: [
                ...tabs.slice(0, currentTabIndex),
                {
                  ...tabs[currentTabIndex],
                  ...tab,
                },
                ...tabs.slice(currentTabIndex + 1),
              ],
            };
          }

          return { ...state };
        }),
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
