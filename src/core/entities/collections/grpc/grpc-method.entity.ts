import { GrpcMethodDefinition, GrpcMethodType } from '@core';

export type IGrpcMethod = {
  id?: string;
} & GrpcMethodDefinition;

export class GrpcMethod implements IGrpcMethod {
  public id?: string;

  public name: string;

  public type: GrpcMethodType;

  constructor({ id, name, type }: IGrpcMethod) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
