import { grpc } from '@improbable-eng/grpc-web';

import { GrpcWebMetadataValue } from './interfaces';

export class MetadataParser {
  static parse(value: Record<string, GrpcWebMetadataValue>): grpc.Metadata {
    return Object.keys(value).reduce((metadata, key) => {
      metadata.set(key, value[key]);

      return metadata;
    }, new grpc.Metadata());
  }
}
