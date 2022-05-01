import create from 'zustand';

import { TabsStorage } from './interfaces';

export const useTabsStore = create<TabsStorage>(() => ({
  tabs: [],
}));
