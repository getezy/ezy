import { AutoMap } from '@automapper/classes';

import { GrpcTlsConfig, GrpcTlsType } from '@core';

export class TlsPreset<T extends GrpcTlsType = GrpcTlsType> {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  system!: boolean;

  tls!: GrpcTlsConfig<T>;
}
