import { GrpcOptions } from '@core';

// import { Collection } from '../../collections/interfaces';

export enum ServiceType {
  GRPC = 'grpc',
}

export interface BasicServiceOptions {
  type: ServiceType;
}

export type ServiceOptions<T extends ServiceType> = BasicServiceOptions &
  (T extends ServiceType.GRPC ? GrpcOptions : never);

export interface Service {
  id: string;
  // collection: Collection;
  name: string;
  options: ServiceOptions<ServiceType>;
}
