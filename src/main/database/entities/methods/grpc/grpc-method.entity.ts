import { Entity, EntityRepositoryType, Enum, PrimaryKey, Property } from '@mikro-orm/core';

import { GrpcMethodType } from '@core';

// eslint-disable-next-line import/no-cycle
import { GrpcMethodsRepository } from './grpc-methods.repository';
import { GrpcMethod as IGrpcMethod } from './interfaces';

@Entity({ tableName: 'grpc_methods', customRepository: () => GrpcMethodsRepository })
export class GrpcMethod implements IGrpcMethod {
  [EntityRepositoryType]?: GrpcMethodsRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  serviceId!: string;

  @Property()
  name!: string;

  @Enum({ type: 'string', items: () => GrpcMethodType })
  type!: GrpcMethodType;
}
