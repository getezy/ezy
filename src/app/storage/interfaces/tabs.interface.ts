export interface Tab {
  id: string;
  title: string;
  active: boolean;
}

export interface TabsStorage {
  tabs: Tab[];

  create: (tab: Omit<Tab, 'id' | 'active'>) => void;
  remove: (id: string) => void;
  activate: (id: string) => void;
  getActiveTabId: () => string | undefined;
  move: (activeId: string, overId: string | undefined) => void;
}
