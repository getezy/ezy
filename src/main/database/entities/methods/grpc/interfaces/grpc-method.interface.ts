import { GrpcMethodType } from '@core/types';

export interface GrpcMethod {
  id: string;
  serviceId: string;
  name: string;
  type: GrpcMethodType;
}
