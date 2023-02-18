import { Environment, IEnvironment } from '@core';

export interface EnvironmentsStorage {
  environments: Environment[];

  fetch: () => Promise<void>;
  createEnvironment: (environment: IEnvironment) => void;
  removeEnvironment: (id: string) => void;
}
