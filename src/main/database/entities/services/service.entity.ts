/* eslint-disable max-classes-per-file */

import {
  ArrayType,
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import type { Collection } from '../collections';
import { Service as IService, ServiceOptions as IServiceOptions, ServiceType } from './interfaces';
// eslint-disable-next-line import/no-cycle
import { ServicesRepository } from './services.repository';

@Embeddable({ abstract: true, discriminatorColumn: 'type' })
export abstract class ServiceOptions {
  @Enum({ type: 'string', items: () => ServiceType })
  type!: ServiceType;
}

@Embeddable({ discriminatorValue: ServiceType.GRPC })
export class GrpcServiceOptions
  extends ServiceOptions
  implements IServiceOptions<ServiceType.GRPC>
{
  @Property()
  path!: string;

  @Property({ type: ArrayType, nullable: true })
  includeDirs?: string[];

  constructor() {
    super();
    this.type = ServiceType.GRPC;
  }
}

@Entity({ tableName: 'services', customRepository: () => ServicesRepository })
export class Service implements IService {
  [EntityRepositoryType]?: ServicesRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Embedded(() => [GrpcServiceOptions], { object: true })
  options!: GrpcServiceOptions;

  @ManyToOne('Collection')
  collection!: Collection;
}
