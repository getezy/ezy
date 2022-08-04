import type {
  ChannelCredentials,
  ClientDuplexStream,
  ClientReadableStream,
  ClientWritableStream,
  MetadataValue,
  ServerErrorResponse,
  ServiceClientConstructor,
} from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import type { PackageDefinition } from '@grpc/proto-loader';
import * as fs from 'fs';
import * as _ from 'lodash';

import { GrpcClientRequestOptions, GrpcTlsConfig, GrpcTlsType } from './interfaces';
import { MetadataParser } from './metadata-parser';

function instanceOfServiceClientConstructor(object: any): object is ServiceClientConstructor {
  return 'serviceName' in object;
}

function isMutualTlsConfig(
  config: GrpcTlsConfig<GrpcTlsType>
): config is GrpcTlsConfig<GrpcTlsType.MUTUAL> {
  return config.type === GrpcTlsType.MUTUAL;
}

export class GrpcClient {
  private static getChannelCredentials(
    tls: GrpcTlsConfig<GrpcTlsType> | undefined
  ): ChannelCredentials {
    let credentials: ChannelCredentials;

    if (!tls) {
      credentials = grpc.credentials.createInsecure();
    } else if (isMutualTlsConfig(tls)) {
      const rootCert = fs.readFileSync(tls.rootCertificatePath);
      const clientCert = fs.readFileSync(tls.clientCertificatePath);
      const clientKey = fs.readFileSync(tls.clientKeyPath);

      credentials = grpc.credentials.createSsl(rootCert, clientKey, clientCert);
    } else {
      const rootCert = fs.readFileSync(tls.rootCertificatePath);
      credentials = grpc.credentials.createSsl(rootCert);
    }

    return credentials;
  }

  private static loadClient(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions
  ) {
    const ast = grpc.loadPackageDefinition(packageDefinition);
    const ServiceClient = _.get(ast, requestOptions.serviceName);

    if (ServiceClient && instanceOfServiceClientConstructor(ServiceClient)) {
      const client = new ServiceClient(
        requestOptions.address,
        this.getChannelCredentials(requestOptions.tls)
      );

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

    return new Promise((resolve) => {
      client[requestOptions.methodName](
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

  static invokeServerStreamingRequest<ResponseType = Record<string, unknown>>(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, MetadataValue>
  ): ClientReadableStream<ResponseType> {
    const client = this.loadClient(packageDefinition, requestOptions);

    const call: ClientReadableStream<ResponseType> = client[requestOptions.methodName](
      payload,
      metadata ? MetadataParser.parse(metadata) : new grpc.Metadata()
    );

    return call;
  }

  static invokeClientStreamingRequest<RequestType = Record<string, unknown>>(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    metadata?: Record<string, MetadataValue>
  ): ClientWritableStream<RequestType> {
    const client = this.loadClient(packageDefinition, requestOptions);

    const call: ClientWritableStream<RequestType> = client[requestOptions.methodName](
      metadata ? MetadataParser.parse(metadata) : new grpc.Metadata(),
      (error: ServerErrorResponse, response: Record<string, unknown>) => {
        if (error) {
          return call.emit('error', {
            code: error.code,
            details: error.details,
            metadata: error.metadata,
          });
        }

        return call.emit('data', response);
      }
    );

    return call;
  }

  static invokeBidirectionalStreamingRequest<
    RequestType = Record<string, unknown>,
    ResponseType = Record<string, unknown>
  >(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    metadata?: Record<string, MetadataValue>
  ): ClientDuplexStream<RequestType, ResponseType> {
    const client = this.loadClient(packageDefinition, requestOptions);

    const call: ClientDuplexStream<RequestType, ResponseType> = client[requestOptions.methodName](
      metadata ? MetadataParser.parse(metadata) : new grpc.Metadata()
    );

    return call;
  }
}
