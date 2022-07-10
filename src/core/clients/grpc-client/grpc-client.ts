import type { MetadataValue, ServerErrorResponse, ServiceClientConstructor } from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import type { PackageDefinition } from '@grpc/proto-loader';
import * as _ from 'lodash';

import { MetadataParser } from './metadata-parser';

function instanceOfServiceClientConstructor(object: any): object is ServiceClientConstructor {
  return 'serviceName' in object;
}

export class GrpcClient {
  static async sendUnaryRequest(
    packageDefinition: PackageDefinition,
    serviceName: string,
    methodName: string,
    address: string,
    payload: Record<string, unknown>,
    metadata?: Record<string, MetadataValue>
  ): Promise<Record<string, unknown>> {
    const ast = grpc.loadPackageDefinition(packageDefinition);
    const ServiceClient = _.get(ast, serviceName);

    if (ServiceClient && instanceOfServiceClientConstructor(ServiceClient)) {
      const client = new ServiceClient(address, grpc.credentials.createInsecure());

      if (client[methodName] && typeof client[methodName] === 'function') {
        return new Promise((resolve) => {
          client[methodName](
            payload,
            metadata ? MetadataParser.parse(metadata) : new grpc.Metadata(),
            (error: ServerErrorResponse, response: any) => {
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
    }

    throw new Error('No method definition');
  }
}
