import { AutoMap } from '@automapper/classes';

import { Service } from '@core';

export class Collection {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap(() => [Service])
  services!: Service[];
}
