import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Tab, TabsStorage } from './interfaces';

const initialState: Tab[] = [
  {
    id: nanoid(),
    title: 'Tab 1',
    active: false,
  },
  {
    id: nanoid(),
    title: 'Long Tab Name 2',
    active: true,
  },
];

export const useTabsStore = create<TabsStorage>(
  // @ts-ignore
  persist(
    (set, get) => ({
      tabs: initialState,
      create: (tab) =>
        set((state) => {
          const { tabs } = get();
          tabs.push({ ...tab, id: nanoid() });

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
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
