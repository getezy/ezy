import { IAbstractTab, ICreateTabPayload, IUpdateTabPayload } from '@core';

export interface TabsState {
  tabs: IAbstractTab[];

  activeTabId?: string;
}

export interface TabsStorageSlice extends TabsState {
  fetchTabs: () => Promise<void>;
  createTab: (payload: ICreateTabPayload) => Promise<void>;
  updateTab: (id: string, payload: IUpdateTabPayload) => Promise<void>;
  moveTab: (currentId: string, overId: string) => Promise<void>;
  activateTab: (id: string) => Promise<void>;
  closeTab: (id: string) => Promise<void>;
  closeActiveTab: () => Promise<void>;
  closeAllTabs: () => Promise<void>;
}
