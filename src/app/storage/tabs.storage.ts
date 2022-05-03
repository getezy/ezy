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
    title: 'Tab 2',
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
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
