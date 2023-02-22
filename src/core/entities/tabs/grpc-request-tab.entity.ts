import { AutoMap } from '@automapper/classes';

import { GrpcProtocolType } from '@core';

import { AbstractTab } from './abstract-tab.entity';
import { IAbstractTab } from './interfaces';

export interface IGrpcRequestTab extends IAbstractTab {
  protocol: GrpcProtocolType;

  url: string;
}

export class GrpcRequestTab extends AbstractTab implements IGrpcRequestTab {
  @AutoMap()
  protocol: GrpcProtocolType;

  @AutoMap()
  url: string;

  constructor({ protocol, url, ...base }: IGrpcRequestTab) {
    super(base);

    this.protocol = protocol;
    this.url = url;
  }
}
