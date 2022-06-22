export interface Environment {
  id: string;
  name: string;
  url: string;
  color: string;
}

export interface EnvironmentsStorage {
  environments: Environment[];

  createEnvironment: (tab: Omit<Environment, 'id'>) => void;
  removeEnvironment: (id: string) => void;
}
