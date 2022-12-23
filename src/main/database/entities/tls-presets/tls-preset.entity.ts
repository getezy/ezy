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
}

// @Embeddable({ discriminatorColumn: 'type', discriminatorValue: GrpcTlsType.INSECURE })
// export class InsecureTls implements GrpcTlsConfig<GrpcTlsType.INSECURE> {
@Embeddable({ discriminatorValue: GrpcTlsType.INSECURE })
export class InsecureTls extends TLS implements GrpcTlsConfig<GrpcTlsType.INSECURE> {
  // @Enum(() => GrpcTlsType)
  // type!: GrpcTlsType.INSECURE;

  @Embedded(() => GrpcChannelOptions, { nullable: true, object: true })
  channelOptions?: GrpcChannelOptions;

  constructor() {
    super();
    this.type = GrpcTlsType.INSECURE;
  }
}

// @Embeddable({ discriminatorColumn: 'type', discriminatorValue: GrpcTlsType.SERVER_SIDE })
// export class ServerSideTls implements GrpcTlsConfig<GrpcTlsType.SERVER_SIDE> {
@Embeddable({ discriminatorValue: GrpcTlsType.SERVER_SIDE })
export class ServerSideTls extends TLS implements GrpcTlsConfig<GrpcTlsType.SERVER_SIDE> {
  // @Enum(() => GrpcTlsType)
  // type!: GrpcTlsType.SERVER_SIDE;

  @Property({ nullable: true })
  rootCertificatePath?: string;

  @Embedded(() => GrpcChannelOptions, { nullable: true, object: true })
  channelOptions?: GrpcChannelOptions;

  constructor() {
    super();
    this.type = GrpcTlsType.SERVER_SIDE;
  }
}

// @Embeddable({ discriminatorColumn: 'type', discriminatorValue: GrpcTlsType.MUTUAL })
// export class MutualTls implements GrpcTlsConfig<GrpcTlsType.MUTUAL> {
@Embeddable({ discriminatorValue: GrpcTlsType.MUTUAL })
export class MutualTls extends TLS implements GrpcTlsConfig<GrpcTlsType.MUTUAL> {
  // @Enum(() => GrpcTlsType)
  // type!: GrpcTlsType.MUTUAL;

  @Property()
  clientCertificatePath!: string;

  @Property()
  clientKeyPath!: string;

  @Property({ nullable: true })
  rootCertificatePath?: string;

  @Embedded(() => GrpcChannelOptions, { nullable: true, object: true })
  channelOptions?: GrpcChannelOptions;

  constructor() {
    super();
    this.type = GrpcTlsType.MUTUAL;
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
