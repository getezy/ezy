import { IAbstractTab } from '@core';

export interface TabsState {
  tabs: IAbstractTab[];

  activeTabId?: string;
}

export interface TabsStorage extends TabsState {
  fetch: () => Promise<void>;
  create: (payload: Omit<IAbstractTab, 'id' | 'order' | 'active'>) => Promise<void>;
}
