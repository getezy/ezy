export interface Environment {
  id: string;
  label: string;
  url: string;
  authority: string;
  color: string;
}

export interface EnvironmentsStorage {
  environments: Environment[];

  createEnvironment: (environment: Environment) => void;
  removeEnvironment: (id: string) => void;
}
