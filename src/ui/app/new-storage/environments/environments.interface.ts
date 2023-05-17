import { Environment, IEnvironment } from '@core';

export interface EnvironmentsStorageSlice {
  environments: Environment[];

  fetchEnvironments: () => Promise<void>;
  createEnvironment: (environment: IEnvironment) => Promise<void>;
  removeEnvironment: (id: string) => Promise<void>;
}
