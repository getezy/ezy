/* eslint-disable max-classes-per-file */

import {
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { GrpcChannelOptions as IGrpcChannelOptions, GrpcTlsConfig, GrpcTlsType } from '@core/types';

import { TlsPreset as ITlsPreset } from './interfaces';
// eslint-disable-next-line import/no-cycle
import { TlsPresetsRepository } from './tls-presets.repository';

@Embeddable()
export class GrpcChannelOptions implements IGrpcChannelOptions {
  @Property({ nullable: true })
  sslTargetNameOverride?: string;
}

@Embeddable({ abstract: true, discriminatorColumn: 'type' })
export abstract class TLS {
  @Enum(() => GrpcTlsType)
  type!: GrpcTlsType;

  @Embedded(() => GrpcChannelOptions, { nullable: true, object: true })
  channelOptions?: GrpcChannelOptions;
}

@Embeddable({ discriminatorValue: GrpcTlsType.INSECURE })
export class InsecureTls extends TLS implements GrpcTlsConfig<GrpcTlsType.INSECURE> {
  constructor(channelOptions: GrpcChannelOptions) {
    super();
    this.type = GrpcTlsType.INSECURE;
    this.channelOptions = channelOptions;
  }
}

@Embeddable({ discriminatorValue: GrpcTlsType.SERVER_SIDE })
export class ServerSideTls extends TLS implements GrpcTlsConfig<GrpcTlsType.SERVER_SIDE> {
  @Property({ nullable: true })
  rootCertificatePath?: string;

  constructor(channelOptions: GrpcChannelOptions) {
    super();
    this.type = GrpcTlsType.SERVER_SIDE;
    this.channelOptions = channelOptions;
  }
}

@Embeddable({ discriminatorValue: GrpcTlsType.MUTUAL })
export class MutualTls extends TLS implements GrpcTlsConfig<GrpcTlsType.MUTUAL> {
  @Property()
  clientCertificatePath!: string;

  @Property()
  clientKeyPath!: string;

  @Property({ nullable: true })
  rootCertificatePath?: string;

  constructor(channelOptions: GrpcChannelOptions) {
    super();
    this.type = GrpcTlsType.MUTUAL;
    this.channelOptions = channelOptions;
  }
}

@Entity({ tableName: 'tls_presets', customRepository: () => TlsPresetsRepository })
export class TlsPreset implements ITlsPreset {
  [EntityRepositoryType]?: TlsPresetsRepository;

  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property({ default: false })
  system: boolean = false;

  @Embedded(() => [InsecureTls, ServerSideTls, MutualTls], { object: true })
  tls!: InsecureTls | ServerSideTls | MutualTls;
}
