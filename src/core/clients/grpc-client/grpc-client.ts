import type {
  ClientReadableStream,
  MetadataValue,
  ServerErrorResponse,
  ServiceClientConstructor,
} from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import type { PackageDefinition } from '@grpc/proto-loader';
import * as _ from 'lodash';

import { GrpcClientRequestOptions } from './interfaces';
import { MetadataParser } from './metadata-parser';

function instanceOfServiceClientConstructor(object: any): object is ServiceClientConstructor {
  return 'serviceName' in object;
}

export class GrpcClient {
  private static loadClient(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions
  ) {
    const ast = grpc.loadPackageDefinition(packageDefinition);
    const ServiceClient = _.get(ast, requestOptions.serviceName);

    if (ServiceClient && instanceOfServiceClientConstructor(ServiceClient)) {
      const client = new ServiceClient(requestOptions.address, grpc.credentials.createInsecure());

      if (
        client[requestOptions.methodName] &&
        typeof client[requestOptions.methodName] === 'function'
      ) {
        return client;
      }

      throw new Error('No method definition');
    }

    throw new Error('No service definition');
  }

  static async invokeUnaryRequest(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, MetadataValue>
  ): Promise<Record<string, unknown>> {
    const client = this.loadClient(packageDefinition, requestOptions);

    const method = client[requestOptions.methodName];

    return new Promise((resolve) => {
      method(
        payload,
        metadata ? MetadataParser.parse(metadata) : new grpc.Metadata(),
        (error: ServerErrorResponse, response: Record<string, unknown>) => {
          if (error) {
            return resolve({
              code: error.code,
              details: error.details,
              metadata: error.metadata,
            });
          }

          return resolve(response);
        }
      );
    });
  }

  static invokeServerStreamingRequest<T = Record<string, unknown>>(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, MetadataValue>
  ): ClientReadableStream<T> {
    const client = this.loadClient(packageDefinition, requestOptions);

    const call: ClientReadableStream<T> = client[requestOptions.methodName](
      payload,
      metadata ? MetadataParser.parse(metadata) : new grpc.Metadata()
    );

    return call;
  }
}
