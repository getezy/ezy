import type { MetadataValue, ServiceClientConstructor } from '@grpc/grpc-js';
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
  ) {
    const ast = grpc.loadPackageDefinition(packageDefinition);
    const ServiceClient = _.get(ast, serviceName);

    if (ServiceClient && instanceOfServiceClientConstructor(ServiceClient)) {
      const client = new ServiceClient(address, grpc.credentials.createInsecure());

      if (client[methodName] && typeof client[methodName] === 'function') {
        return new Promise((resolve, reject) => {
          client[methodName](
            payload,
            metadata ? MetadataParser.parse(metadata) : new grpc.Metadata(),
            (err: any, response: any) => {
              if (err) {
                return reject(err);
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
