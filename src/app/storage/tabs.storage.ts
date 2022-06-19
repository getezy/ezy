import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Tab, TabsStorage } from './interfaces';

const initialState: Tab[] = [
  {
    id: nanoid(),
    title: 'First Tab',
  },
  {
    id: nanoid(),
    title: 'Second Tab',
  },
  {
    id: nanoid(),
    title: 'Third Tab',
  },
  {
    id: nanoid(),
    title: 'Fourth Tab',
  },
  {
    id: nanoid(),
    title: 'Sixth Tab',
  },
  {
    id: nanoid(),
    title: 'Seventh Tab',
  },
];

export const useTabsStore = create(
  persist<TabsStorage>(
    (set, get) => ({
      tabs: initialState,
      activeTabId: undefined,
      createTab: (tab) =>
        set((state) => {
          const { tabs } = get();

          tabs.push({ ...tab, id: nanoid() });

          return { ...state, tabs: [...tabs] };
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

          let currentTab = tabs.find((item) => item.id === tab.id);

          if (currentTab) {
            currentTab = { ...currentTab, ...tab };
          }

          return { ...state, tabs: [...tabs] };
        }),
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
