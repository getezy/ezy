import { Environment, IEnvironment } from '@core';

export interface EnvironmentsStorage {
  environments: Environment[];

  fetch: () => Promise<void>;
  create: (environment: IEnvironment) => Promise<void>;
  remove: (id: string) => Promise<void>;
}
