/* eslint-disable max-classes-per-file */

import { AutoMap } from '@automapper/classes';
import {
  GrpcChannelOptions as IGrpcChannelOptions,
  GrpcInsecureTlsConfig,
  GrpcMutualTlsConfig,
  GrpcServerSideTlsConfig,
  GrpcTlsType,
} from '@getezy/grpc-client';
import {
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

// eslint-disable-next-line import/no-cycle
import { TlsPresetsRepository } from './tls-presets.repository';

@Embeddable()
export class GrpcChannelOptions implements IGrpcChannelOptions {
  @Property({ nullable: true })
  sslTargetNameOverride?: string;
}

@Embeddable({ abstract: true, discriminatorColumn: 'type' })
export abstract class TLS {
  @Enum({ type: 'string', items: () => GrpcTlsType })
  type!: GrpcTlsType;
}

@Embeddable({ discriminatorValue: GrpcTlsType.INSECURE })
export class InsecureTls extends TLS implements GrpcInsecureTlsConfig {
  declare type: GrpcTlsType.INSECURE;
}

@Embeddable({ discriminatorValue: GrpcTlsType.SERVER_SIDE })
export class ServerSideTls extends TLS implements GrpcServerSideTlsConfig {
  declare type: GrpcTlsType.SERVER_SIDE;

  @Property({ nullable: true })
  rootCertificatePath?: string;
}

@Embeddable({ discriminatorValue: GrpcTlsType.MUTUAL })
export class MutualTls extends TLS implements GrpcMutualTlsConfig {
  declare type: GrpcTlsType.MUTUAL;

  @Property()
  clientCertificatePath!: string;

  @Property()
  clientKeyPath!: string;

  @Property({ nullable: true })
  rootCertificatePath?: string;
}

@Entity({ tableName: 'tls_presets', customRepository: () => TlsPresetsRepository })
export class TlsPreset {
  [EntityRepositoryType]?: TlsPresetsRepository;

  @PrimaryKey()
  @AutoMap()
  id!: string;

  @Property()
  @AutoMap()
  name!: string;

  @Property({ default: false })
  @AutoMap()
  system: boolean = false;

  @Embedded(() => [InsecureTls, ServerSideTls, MutualTls], { object: true })
  tls!: InsecureTls | ServerSideTls | MutualTls;

  @Embedded(() => GrpcChannelOptions, { nullable: true, object: true })
  @AutoMap()
  channelOptions?: GrpcChannelOptions;
}
