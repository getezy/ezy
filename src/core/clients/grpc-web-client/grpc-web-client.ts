import type { MethodDefinition, PackageDefinition } from '@grpc/proto-loader';
import {
  ClientReadableStream,
  GrpcWebClientBase,
  Metadata,
  MethodDescriptor,
  MethodType,
} from 'grpc-web';
import * as _ from 'lodash';

import { GrpcWebClientRequestOptions } from './interfaces';

// https://github.com/grpc/grpc-web/issues/453#issuecomment-522022719
global.XMLHttpRequest = require('xhr2');

function instanceOfMethodDefinition(object: any): object is MethodDefinition<any, any> {
  return 'requestSerialize' in object && 'responseDeserialize' in object;
}

export class GrpcWebClient {
  private static loadClient() {
    return new GrpcWebClientBase({ format: 'text' });
  }

  private static loadMethodDescriptor<RequestType, ResponseType>(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcWebClientRequestOptions
  ) {
    const service = _.get(packageDefinition, requestOptions.serviceName);

    if (service) {
      const method = _.get(service, requestOptions.methodName);

      if (method && instanceOfMethodDefinition(method)) {
        const methodDescriptor = new MethodDescriptor<RequestType, ResponseType>(
          method.path,
          method.requestStream ? MethodType.SERVER_STREAMING : MethodType.UNARY,
          // @ts-ignore
          method.requestType,
          // @ts-ignore
          method.responseType,
          method.requestSerialize,
          method.responseDeserialize
        );

        return methodDescriptor;
      }

      throw new Error('No method definition');
    }

    throw new Error('No service definition');
  }

  private static getMethodUrl(
    requestOptions: GrpcWebClientRequestOptions,
    methodDescriptor: MethodDescriptor<unknown, unknown>
  ) {
    return `http://${requestOptions.address}${methodDescriptor.getName()}`;
  }

  static async invokeUnaryRequest<
    RequestType = Record<string, unknown>,
    ResponseType = Record<string, unknown>
  >(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcWebClientRequestOptions,
    payload: RequestType,
    metadata?: Metadata
  ): Promise<ResponseType> {
    const client = this.loadClient();
    const methodDescriptor = this.loadMethodDescriptor<RequestType, ResponseType>(
      packageDefinition,
      requestOptions
    );

    return client.thenableCall<RequestType, ResponseType>(
      this.getMethodUrl(requestOptions, methodDescriptor),
      payload,
      metadata || {},
      methodDescriptor
    );
  }

  static invokeServerStreamingRequest<
    RequestType = Record<string, unknown>,
    ResponseType = Record<string, unknown>
  >(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcWebClientRequestOptions,
    payload: RequestType,
    metadata?: Metadata
  ): ClientReadableStream<ResponseType> {
    const client = this.loadClient();
    const methodDescriptor = this.loadMethodDescriptor<RequestType, ResponseType>(
      packageDefinition,
      requestOptions
    );

    const call = client.serverStreaming<RequestType, ResponseType>(
      this.getMethodUrl(requestOptions, methodDescriptor),
      payload,
      metadata || {},
      methodDescriptor
    );

    return call;
  }
}
