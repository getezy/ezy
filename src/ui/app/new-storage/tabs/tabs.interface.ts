import { IAbstractTab, ICreateTabPayload, IUpdateTabPayload } from '@core';

export interface TabsState {
  tabs: IAbstractTab[];

  activeTabId?: string;
}

export interface TabsStorage extends TabsState {
  fetch: () => Promise<void>;
  create: (payload: ICreateTabPayload) => Promise<void>;
  update: (id: string, payload: IUpdateTabPayload) => Promise<void>;
  moveTab: (currentId: string, overId: string) => Promise<void>;
  activateTab: (id: string) => Promise<void>;
  closeTab: (id: string) => Promise<void>;
  closeActiveTab: () => Promise<void>;
  closeAllTabs: () => Promise<void>;
}
