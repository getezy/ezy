import { GrpcOptions } from '@core/types';

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
  collectionId: string;
  name: string;
  options: ServiceOptions<ServiceType>;
}
