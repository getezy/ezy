import { GrpcMethodType } from '@core';

export interface GrpcMethod {
  id: string;
  serviceId: string;
  name: string;
  type: GrpcMethodType;
}
