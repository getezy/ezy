import { AbstractCollection } from './abstract-collection.entity';
import { CollectionType } from './collection-type.enum';
import { GrpcCollection } from './grpc';

export function isGrpcCollection(value: AbstractCollection): value is GrpcCollection {
  return value.type === CollectionType.Grpc;
}
