import { Environment } from './environments.interface';

export interface TabRequest {
  id: string;
  value?: string;
}

export interface TabMetadata {
  id: string;
  value?: string;
}

export interface TabResponse {
  id: string;
  value?: string;
}

export interface TabRequestContainer {
  activeTabId: string | undefined;
  request: TabRequest;
  metadata: TabMetadata;
}

export interface Tab {
  id: string;
  title: string;
  environment?: Environment | null;
  url?: string;

  requestContainer: TabRequestContainer;

  response: TabResponse;
}

export interface TabsStorage {
  tabs: Tab[];

  activeTabId: string | undefined;

  createTab: (tab: Omit<Tab, 'id' | 'active'>) => void;
  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
  moveTab: (currentId: string, overId: string | undefined) => void;
  updateTab: (tab: Partial<Tab> & Pick<Tab, 'id'>) => void;
}
