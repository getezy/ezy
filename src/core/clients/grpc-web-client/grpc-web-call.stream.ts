import { grpc } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { EventEmitter } from 'events';

import { GrpcWebError } from './grpc-web.error';

export declare interface GrpcWebCallStream {
  on(event: 'message', listener: (message: Record<string, unknown>) => void): this;
  on(event: 'headers', listener: (headers: grpc.Metadata) => void): this;
  on(event: 'error', listener: (error: GrpcWebError) => void): this;
  on(
    event: 'end',
    listener: (code: grpc.Code, details: string, metadata: grpc.Metadata) => void
  ): this;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GrpcWebCallStream extends EventEmitter {
  private call: grpc.Request;

  constructor(
    private readonly methodDefinition: grpc.MethodDefinition<
      grpc.ProtobufMessage,
      grpc.ProtobufMessage
    >,
    private readonly options: Omit<
      grpc.InvokeRpcOptions<grpc.ProtobufMessage, grpc.ProtobufMessage>,
      'onMessage' | 'onEnd' | 'transport'
    >
  ) {
    super();

    this.call = grpc.invoke(this.methodDefinition, {
      ...this.options,
      transport: NodeHttpTransport(),
      onMessage: (responseMessage) => {
        this.emit('message', responseMessage);
      },
      onHeaders: (headers) => {
        this.emit('headers', headers);
      },
      onEnd: (code, details, metadata) => {
        if (code !== grpc.Code.OK) {
          this.emit('error', new GrpcWebError(code, details, metadata));
        } else {
          this.emit('end', code, details, metadata);
        }
      },
    });
  }

  cancel() {
    this.call.close();
  }
}
