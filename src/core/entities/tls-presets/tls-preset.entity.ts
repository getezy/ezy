import { AutoMap } from '@automapper/classes';
import type { GrpcChannelOptions, GrpcTlsConfig } from '@getezy/grpc-client';
import { GrpcTlsType } from '@getezy/grpc-client';
import { v4 as uuid } from 'uuid';

import { ITlsPreset } from './interfaces';

export class TlsPreset<T extends GrpcTlsType = GrpcTlsType> implements ITlsPreset<T> {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  system: boolean;

  tls: GrpcTlsConfig<T>;

  @AutoMap()
  channelOptions?: GrpcChannelOptions;

  static create<T extends GrpcTlsType = GrpcTlsType>(data: Omit<ITlsPreset<T>, 'id'>) {
    return new TlsPreset({
      id: uuid(),
      ...data,
    });
  }

  constructor({ id, name, system, tls, channelOptions }: ITlsPreset<T>) {
    this.id = id;
    this.name = name;
    this.system = system;
    this.tls = tls;
    this.channelOptions = channelOptions;
  }
}
