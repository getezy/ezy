import { GrpcOptions } from '@core';

import { AbstractCollection, IAbstractCollection } from '../abstract-collection.entity';
import { CollectionType } from '../collection-type.enum';
import { GrpcService, IGrpcService } from './grpc-service.entity';

export type IGrpcCollection = {
  options: GrpcOptions;
  services: IGrpcService[];
} & Pick<IAbstractCollection, 'id' | 'name'>;

export class GrpcCollection extends AbstractCollection implements IGrpcCollection {
  public options: GrpcOptions;

  public services: GrpcService[];

  constructor({ id, name, options, services }: IGrpcCollection) {
    super({ id, name, type: CollectionType.Grpc });
    this.options = options;
    this.services = services.map((service) => new GrpcService(service));
  }
}
