export interface Tab {
  id: string;
  title: string;
}

export interface TabsStorage {
  tabs: Tab[];

  create: (tab: Omit<Tab, 'id'>) => void;
  remove: (id: string) => void;
}
