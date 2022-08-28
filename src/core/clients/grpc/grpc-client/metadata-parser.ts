import { Metadata, MetadataValue } from '@grpc/grpc-js';

export class MetadataParser {
  static parse(value: Record<string, MetadataValue>): Metadata {
    return Object.keys(value).reduce((metadata, key) => {
      metadata.set(key, value[key]);

      return metadata;
    }, new Metadata());
  }
}
