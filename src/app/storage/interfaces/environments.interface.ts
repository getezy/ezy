export interface Environment {
  value: string;
  label: string;
  url: string;
  color: string;
}

export interface EnvironmentsStorage {
  environments: Environment[];

  createEnvironment: (tab: Omit<Environment, 'id'>) => void;
  removeEnvironment: (id: string) => void;
}
