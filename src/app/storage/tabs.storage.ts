import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Tab, TabsStorage } from './interfaces';

const initialState: Tab[] = [
  {
    id: nanoid(),
    title: 'Tab 1',
  },
  {
    id: nanoid(),
    title: 'Tab 2',
  },
];

export const useTabsStore = create<TabsStorage>(
  // @ts-ignore
  persist(
    // @ts-ignore
    (set, get) => ({
      ...initialState,
      create: (tab) =>
        set(() => {
          const { tabs } = get();
          tabs.push({ ...tab, id: nanoid() });

          return { tabs };
        }),
      remove: (id) =>
        set(() => {
          const { tabs } = get();
          return { tabs: tabs.filter((item) => item.id !== id) };
        }),
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
