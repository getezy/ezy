import type { MethodDefinition, PackageDefinition } from '@grpc/proto-loader';
import { GrpcWebClientBase, Metadata, MethodDescriptor, MethodType } from 'grpc-web';
import * as _ from 'lodash';

import { GrpcClientRequestOptions } from '../grpc-client/interfaces';

// https://github.com/grpc/grpc-web/issues/453#issuecomment-522022719
global.XMLHttpRequest = require('xhr2');

function instanceOfMethodDefinition(object: any): object is MethodDefinition<any, any> {
  return 'requestSerialize' in object && 'responseDeserialize' in object;
}

export class GrpcWebClient {
  private static loadClient() {
    return new GrpcWebClientBase({ format: 'text' });
  }

  private static loadMethodDescriptor(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions
  ) {
    const service = _.get(packageDefinition, requestOptions.serviceName);

    if (service) {
      const method = _.get(service, requestOptions.methodName);

      if (method && instanceOfMethodDefinition(method)) {
        const methodDescriptor = new MethodDescriptor<
          Record<string, unknown>,
          Record<string, unknown>
        >(
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
    requestOptions: GrpcClientRequestOptions,
    methodDescriptor: MethodDescriptor<unknown, unknown>
  ) {
    return `http://${requestOptions.address}${methodDescriptor.getName()}`;
  }

  static async invokeUnaryRequest(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Metadata
  ): Promise<Record<string, unknown>> {
    const client = this.loadClient();
    const methodDescriptor = this.loadMethodDescriptor(packageDefinition, requestOptions);

    return client.thenableCall<Record<string, unknown>, Record<string, unknown>>(
      this.getMethodUrl(requestOptions, methodDescriptor),
      payload,
      metadata || {},
      methodDescriptor
    );
  }
}
