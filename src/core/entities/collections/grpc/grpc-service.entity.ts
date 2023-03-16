import { GrpcServiceDefinition } from '@core';

import { GrpcMethod } from './grpc-method.entity';

export type IGrpcService = {
  id?: string;
} & GrpcServiceDefinition;

export class GrpcService implements IGrpcService {
  public id?: string;

  public name: string;

  public methods: GrpcMethod[];

  constructor({ id, name, methods }: IGrpcService) {
    this.id = id;
    this.name = name;
    this.methods = methods.map((method) => new GrpcMethod(method));
  }
}
