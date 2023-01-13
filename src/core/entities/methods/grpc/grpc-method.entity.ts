import { AutoMap } from '@automapper/classes';

import { GrpcMethodType } from '@core';

export class GrpcMethod {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap(() => String)
  type!: GrpcMethodType;
}
