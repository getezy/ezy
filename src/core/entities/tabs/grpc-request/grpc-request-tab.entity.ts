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

  tlsId?: string;
};

export type IGrpcRequestTabCreate = SetOptional<IGrpcRequestTab, 'protocol'>;

export class GrpcRequestTab extends AbstractTab implements IGrpcRequestTab {
  @AutoMap()
  protocol: GrpcProtocolType;

  @AutoMap()
  url?: string;

  @AutoMap()
  environmentId?: string;

  @AutoMap()
  tlsId?: string;

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
    if (Object.hasOwn(payload, 'order') && payload.order !== undefined) {
      this.order = payload.order;
    }

    if (Object.hasOwn(payload, 'active') && payload.active !== undefined) {
      this.active = payload.active;
    }

    if (Object.hasOwn(payload, 'protocol') && payload.protocol !== undefined) {
      this.protocol = payload.protocol;
    }

    if (Object.hasOwn(payload, 'url')) {
      this.url = payload.url;
    }

    if (Object.hasOwn(payload, 'environmentId')) {
      this.environmentId = payload.environmentId;
    }

    if (Object.hasOwn(payload, 'tlsId')) {
      this.tlsId = payload.tlsId;
    }
  }
}
