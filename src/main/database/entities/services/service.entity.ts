/* eslint-disable max-classes-per-file */

import { AutoMap } from '@automapper/classes';
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

import { ServiceOptions as IServiceOptions, ServiceType } from '@core';

import type { Collection } from '../collections';
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
export class Service {
  [EntityRepositoryType]?: ServicesRepository;

  @PrimaryKey()
  @AutoMap()
  id!: string;

  @Property()
  @AutoMap()
  name!: string;

  @Embedded(() => [GrpcServiceOptions], { object: true })
  options!: GrpcServiceOptions;

  @ManyToOne('Collection')
  collection!: Collection;
}
