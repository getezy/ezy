/* eslint-disable max-classes-per-file */

import { AutoMap } from '@automapper/classes';
import {
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { GrpcProtocolType, TabType } from '@core';

// eslint-disable-next-line import/no-cycle
import { TabsRepository } from './tabs.repository';

@Embeddable({ abstract: true, discriminatorColumn: 'type' })
export abstract class TabData {
  @Enum({ type: 'string', items: () => TabType })
  type!: TabType;
}

@Embeddable({ discriminatorValue: TabType.GrpcRequest })
export class GrpcRequestTabData extends TabData {
  @Enum({ type: 'string', items: () => GrpcProtocolType })
  protocol!: GrpcProtocolType;

  @Property()
  url?: string;
}

@Entity({ tableName: 'tabs', customRepository: () => TabsRepository })
export class Tab {
  [EntityRepositoryType]?: TabsRepository;

  @PrimaryKey()
  @AutoMap()
  id!: string;

  @Property()
  @AutoMap()
  title!: string;

  @Property()
  @AutoMap()
  active!: boolean;

  @Property()
  @AutoMap()
  order!: number;

  @Embedded(() => [GrpcRequestTabData], { object: true })
  data!: GrpcRequestTabData;
}
