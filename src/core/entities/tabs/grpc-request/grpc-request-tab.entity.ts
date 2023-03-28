import { AutoMap } from '@automapper/classes';
import { SetOptional } from 'type-fest';

import { GrpcProtocolType, TabType } from '@core';

import { AbstractTab } from '../abstract-tab.entity';
import { IAbstractTab } from '../interfaces';

export type IGrpcRequestTab = IAbstractTab & {
  type: TabType.GrpcRequest;

  protocol: GrpcProtocolType;

  url?: string;

  environmentId?: string;
};

export type IGrpcRequestTabCreate = SetOptional<IGrpcRequestTab, 'protocol'>;

export class GrpcRequestTab extends AbstractTab implements IGrpcRequestTab {
  @AutoMap()
  protocol: GrpcProtocolType;

  @AutoMap()
  url?: string;

  @AutoMap()
  environmentId?: string;

  constructor({
    protocol = GrpcProtocolType.Grpc,
    url,
    environmentId,
    ...base
  }: IGrpcRequestTabCreate) {
    super(base);

    this.protocol = protocol;
    this.url = url;
    this.environmentId = environmentId;
  }

  update(payload: Partial<IGrpcRequestTab>) {
    this.order = payload.order || this.order;
    this.active = payload.active || this.active;
    this.protocol = payload.protocol || this.protocol;
    this.url = payload.url || this.url;
    this.environmentId = payload.environmentId || this.environmentId;
  }
}
