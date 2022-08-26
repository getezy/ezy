/* eslint-disable max-classes-per-file */
import type { MethodDefinition, PackageDefinition } from '@grpc/proto-loader';
import { grpc } from '@improbable-eng/grpc-web';
import * as _ from 'lodash';

import { GrpcWebCallStream } from './grpc-web-call.stream';
import { GrpcWebClientRequestOptions } from './interfaces';

function instanceOfProtobufMethodDefinition<RequestType, ResponseType>(
  object: any
): object is MethodDefinition<RequestType, ResponseType> {
  return 'requestSerialize' in object && 'responseDeserialize' in object;
}

export class GrpcWebClient {
  private static loadMethodDefinition<
    RequestType extends grpc.ProtobufMessage,
    ResponseType extends grpc.ProtobufMessage
  >(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcWebClientRequestOptions
  ): grpc.MethodDefinition<RequestType, ResponseType> {
    const service = _.get(packageDefinition, requestOptions.serviceName);

    if (service) {
      const method = _.get(service, requestOptions.methodName);

      if (method && instanceOfProtobufMethodDefinition<RequestType, ResponseType>(method)) {
        const serviceDefinition: grpc.ServiceDefinition = {
          serviceName: requestOptions.serviceName,
        };

        const methodDefinition: grpc.MethodDefinition<RequestType, ResponseType> = {
          methodName: requestOptions.methodName,
          service: serviceDefinition,
          requestStream: method.requestStream,
          responseStream: method.responseStream,
          requestType: {
            // @ts-ignore
            serializeBinary: method.requestSerialize,
          },
          // @ts-ignore
          responseType: {
            deserializeBinary: method.responseDeserialize,
          },
        };

        return methodDefinition;
      }

      throw new Error('No method definition');
    }

    throw new Error('No service definition');
  }

  private static getUrl(requestOptions: GrpcWebClientRequestOptions) {
    if (
      requestOptions.address.startsWith('http://') ||
      requestOptions.address.startsWith('https://')
    ) {
      return requestOptions.address;
    }

    return `http://${requestOptions.address}`;
  }

  static async invokeUnaryRequest(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcWebClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: grpc.Metadata
  ): Promise<Record<string, unknown>> {
    const methodDefinition = this.loadMethodDefinition<grpc.ProtobufMessage, grpc.ProtobufMessage>(
      packageDefinition,
      requestOptions
    );

    return new Promise((resolve) => {
      const call = new GrpcWebCallStream(methodDefinition, {
        host: this.getUrl(requestOptions),
        // @ts-ignore
        request: {
          // @ts-ignore
          serializeBinary: () => methodDefinition.requestType.serializeBinary(payload),
        },
        metadata,
      });

      call.on('message', (message) => resolve(message));

      call.on('error', (error) => resolve(error.toObject()));
    });
  }

  static invokeServerStreamingRequest(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcWebClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: grpc.Metadata
  ): GrpcWebCallStream {
    const methodDefinition = this.loadMethodDefinition<grpc.ProtobufMessage, grpc.ProtobufMessage>(
      packageDefinition,
      requestOptions
    );

    const call = new GrpcWebCallStream(methodDefinition, {
      host: this.getUrl(requestOptions),
      // @ts-ignore
      request: {
        // @ts-ignore
        serializeBinary: () => methodDefinition.requestType.serializeBinary(payload),
      },
      metadata,
    });

    return call;
  }
}
