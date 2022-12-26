import { EntityRepository } from '@mikro-orm/sqlite';

// eslint-disable-next-line import/no-cycle
import { GrpcMethod } from './grpc-method.entity';

export class GrpcMethodsRepository extends EntityRepository<GrpcMethod> {}
