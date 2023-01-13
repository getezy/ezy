import { createMap } from '@automapper/core';

import { Environment as EnvironmentView } from '@core';

import { mapper } from '../../common';
import { Environment } from './environment.entity';

export function createEnvironmentMappings() {
  createMap(mapper, Environment, EnvironmentView);
}
