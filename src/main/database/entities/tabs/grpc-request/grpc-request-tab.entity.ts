import { AutoMap } from '@automapper/classes';
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

import { GrpcProtocolType } from '@core';

@Entity({ tableName: 'grpc-request-tabs' })
export class GrpcRequestTab {
  @PrimaryKey()
  tab_id!: string;

  @Enum({ type: 'string', items: () => GrpcProtocolType })
  @AutoMap()
  protocol!: GrpcProtocolType;

  @Property()
  @AutoMap()
  url!: string;
}
