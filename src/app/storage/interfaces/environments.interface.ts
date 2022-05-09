export interface Environment {
  id: string;
  name: string;
  url: string;
  color: string;
}

export interface EnvironmentsStorage {
  environments: Environment[];

  create: (tab: Omit<Environment, 'id'>) => void;
  remove: (id: string) => void;
}
