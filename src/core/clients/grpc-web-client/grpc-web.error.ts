import { grpc } from '@improbable-eng/grpc-web';

export class GrpcWebError extends Error {
  constructor(
    readonly code: grpc.Code,
    readonly details: string,
    readonly metadata?: grpc.Metadata
  ) {
    super(details);
  }

  toObject() {
    return {
      code: this.code,
      details: this.details,
      metadata: this.metadata,
    };
  }
}
