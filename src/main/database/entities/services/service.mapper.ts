import { createMap } from '@automapper/core';

import { Service as ServiceView } from '@core';

import { mapper } from '../../common';
import { Service } from './service.entity';

export function createServiceMappings() {
  createMap(mapper, Service, ServiceView);
}
