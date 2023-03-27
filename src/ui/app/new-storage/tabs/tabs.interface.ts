import { IAbstractTab, ICreateTabPayload } from '@core';

export interface TabsState {
  tabs: IAbstractTab[];

  activeTabId?: string;
}

export interface TabsStorage extends TabsState {
  fetch: () => Promise<void>;
  create: (payload: ICreateTabPayload) => Promise<void>;
  moveTab: (currentId: string, overId: string) => void;
  activateTab: (id: string) => void;
  closeTab: (id: string) => void;
  closeActiveTab: () => void;
  closeAllTabs: () => void;
}
