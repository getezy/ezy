import { AutoMap } from '@automapper/classes';

import { GrpcOptions, ServiceType } from '@core';

export interface BasicServiceOptions {
  type: ServiceType;
}

export type ServiceOptions<T extends ServiceType> = BasicServiceOptions &
  (T extends ServiceType.GRPC ? GrpcOptions : never);

export class Service<T extends ServiceType = ServiceType> {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  options!: ServiceOptions<T>;
}
