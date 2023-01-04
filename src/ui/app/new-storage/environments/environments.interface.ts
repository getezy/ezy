import { Environment } from '@database';

export interface EnvironmentsStorage {
  environments: Environment[];

  fetch: () => Promise<void>;
  createEnvironment: (environment: Environment) => void;
  removeEnvironment: (id: string) => void;
}
