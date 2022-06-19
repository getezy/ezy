export interface Tab {
  id: string;
  title: string;

  request?: string;
  metdata?: string;
  response?: string;
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
