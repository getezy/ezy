export interface Environment {
  /**
   * For compatibility with react-select, value === id
   */
  value: string;
  label: string;
  url: string;
  color: string;
}

export interface EnvironmentsStorage {
  environments: Environment[];

  createEnvironment: (environment: Environment) => void;
  removeEnvironment: (id: string) => void;
}
