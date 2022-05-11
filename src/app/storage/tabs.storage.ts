import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Tab, TabsStorage } from './interfaces';

const initialState: Tab[] = [
  {
    id: nanoid(),
    title: 'New Tab',
    active: true,
  },
];

export const useTabsStore = create(
  persist<TabsStorage>(
    (set, get) => ({
      tabs: initialState,
      create: (tab) =>
        set((state) => {
          const { tabs } = get();

          tabs.push({ ...tab, id: nanoid(), active: false });

          return { ...state, tabs: [...tabs] };
        }),
      remove: (id) =>
        set((state) => {
          const { tabs } = get();
          return { ...state, tabs: tabs.filter((item) => item.id !== id) };
        }),
      activate: (id) =>
        set((state) => {
          const { tabs } = get();

          const previousTab = tabs.find((item) => item.active);
          if (previousTab) previousTab.active = false;

          const tab = tabs.find((item) => item.id === id);
          if (tab) tab.active = true;

          return { ...state, tabs: [...tabs] };
        }),
      getActiveTabId: () => get().tabs.find((item) => item.active)?.id,
      move: (activeId, overId) =>
        set((state) => {
          const { tabs } = get();

          const oldIndex = tabs.findIndex((item) => item.id === activeId);
          const newIndex = tabs.findIndex((item) => item.id === overId);

          return { ...state, tabs: arrayMove(tabs, oldIndex, newIndex) };
        }),
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
