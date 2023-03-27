import { AutoMap } from '@automapper/classes';
import { SetOptional } from 'type-fest';

import { GrpcProtocolType, TabType } from '@core';

import { AbstractTab } from '../abstract-tab.entity';
import { IAbstractTab } from '../interfaces';

export type IGrpcRequestTab = IAbstractTab & {
  type: TabType.GrpcRequest;

  protocol: GrpcProtocolType;

  url?: string;
};

export type IGrpcRequestTabCreate = SetOptional<IGrpcRequestTab, 'protocol'>;

export class GrpcRequestTab extends AbstractTab implements IGrpcRequestTab {
  @AutoMap()
  protocol: GrpcProtocolType;

  @AutoMap()
  url?: string;

  constructor({ protocol = GrpcProtocolType.Grpc, url, ...base }: IGrpcRequestTabCreate) {
    super(base);

    this.protocol = protocol;
    this.url = url;
  }
}
