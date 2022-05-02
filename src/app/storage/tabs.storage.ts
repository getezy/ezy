import create from 'zustand';
import { persist } from 'zustand/middleware';

import { TabsStorage } from './interfaces';

export const useTabsStore = create<TabsStorage>(
  // @ts-ignore
  persist(
    () => ({
      tabs: [
        {
          name: 'Tab 1',
        },
      ],
    }),
    {
      name: 'tabs',
      getStorage: () => window.electron.store,
    }
  )
);
