import type { MethodDefinition, PackageDefinition } from '@grpc/proto-loader';
import { grpc } from '@improbable-eng/grpc-web';
import * as fs from 'fs';
import * as https from 'https';
import * as _ from 'lodash';
import { performance } from 'perf_hooks';

import {
  GrpcClientRequestOptions,
  GrpcResponse,
  GrpcTlsConfig,
  GrpcTlsType,
  isInsecureTlsConfig,
  isMutualTlsConfig,
} from '../interfaces';
import { GrpcWebCallStream } from './grpc-web-call.stream';
import { GrpcWebMetadataValue } from './interfaces';
import { MetadataParser } from './metadata-parser';

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
    requestOptions: GrpcClientRequestOptions
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

  private static getRequestOptions(tls: GrpcTlsConfig<GrpcTlsType>): https.RequestOptions {
    let options: https.RequestOptions;

    if (isInsecureTlsConfig(tls)) {
      options = {};
    } else if (isMutualTlsConfig(tls)) {
      const rootCert = tls.rootCertificatePath
        ? fs.readFileSync(tls.rootCertificatePath)
        : undefined;
      const clientCert = fs.readFileSync(tls.clientCertificatePath);
      const clientKey = fs.readFileSync(tls.clientKeyPath);

      options = {
        ca: rootCert,
        cert: clientCert,
        key: clientKey,
      };
    } else {
      const rootCert = tls.rootCertificatePath
        ? fs.readFileSync(tls.rootCertificatePath)
        : undefined;

      options = {
        ca: rootCert,
      };
    }

    return options;
  }

  private static getUrl(requestOptions: GrpcClientRequestOptions) {
    if (
      requestOptions.address.startsWith('http://') ||
      requestOptions.address.startsWith('https://')
    ) {
      return requestOptions.address;
    }

    if (isInsecureTlsConfig(requestOptions.tls)) {
      return `http://${requestOptions.address}`;
    }

    return `https://${requestOptions.address}`;
  }

  static async invokeUnaryRequest(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, GrpcWebMetadataValue>
  ): Promise<GrpcResponse> {
    const methodDefinition = this.loadMethodDefinition<grpc.ProtobufMessage, grpc.ProtobufMessage>(
      packageDefinition,
      requestOptions
    );

    return new Promise((resolve) => {
      const startTime = performance.now();
      const call = new GrpcWebCallStream(
        methodDefinition,
        {
          host: this.getUrl(requestOptions),
          // @ts-ignore
          request: {
            // @ts-ignore
            serializeBinary: () => methodDefinition.requestType.serializeBinary(payload),
          },
          metadata: metadata ? MetadataParser.parse(metadata) : new grpc.Metadata(),
        },
        this.getRequestOptions(requestOptions.tls)
      );

      call.on('message', (message) => {
        const timestamp = Math.trunc(performance.now() - startTime);

        resolve({ timestamp, value: message });
      });

      call.on('error', (error) => {
        const timestamp = Math.trunc(performance.now() - startTime);

        resolve({
          timestamp,
          value: error.toObject(),
        });
      });
    });
  }

  static invokeServerStreamingRequest(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, GrpcWebMetadataValue>
  ): GrpcWebCallStream {
    const methodDefinition = this.loadMethodDefinition<grpc.ProtobufMessage, grpc.ProtobufMessage>(
      packageDefinition,
      requestOptions
    );

    const call = new GrpcWebCallStream(
      methodDefinition,
      {
        host: this.getUrl(requestOptions),
        // @ts-ignore
        request: {
          // @ts-ignore
          serializeBinary: () => methodDefinition.requestType.serializeBinary(payload),
        },
        metadata: metadata ? MetadataParser.parse(metadata) : new grpc.Metadata(),
      },
      this.getRequestOptions(requestOptions.tls)
    );

    return call;
  }
}
