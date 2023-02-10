import type {
  ChannelCredentials,
  ChannelOptions,
  ClientDuplexStream,
  ClientReadableStream,
  ClientWritableStream,
  MetadataValue,
  ServerErrorResponse,
  ServiceClientConstructor,
} from "@grpc/grpc-js";
import * as grpc from "@grpc/grpc-js";
import type { PackageDefinition } from "@grpc/proto-loader";
import * as fs from "fs";
import * as _ from "lodash";
import { performance } from "perf_hooks";

import {
  GrpcChannelOptions,
  GrpcClientRequestOptions,
  GrpcResponse,
  GrpcStatus,
  GrpcTlsConfig,
  GrpcTlsType,
  isInsecureTlsConfig,
  isMutualTlsConfig,
} from "../interfaces";
import { MetadataParser } from "./metadata-parser";

function instanceOfServiceClientConstructor(object: any): object is ServiceClientConstructor {
  return "serviceName" in object;
}

export class GrpcClient {
  private static getChannelCredentials(tls: GrpcTlsConfig<GrpcTlsType>): ChannelCredentials {
    let credentials: ChannelCredentials;

    if (isInsecureTlsConfig(tls)) {
      credentials = grpc.credentials.createInsecure();
    } else if (isMutualTlsConfig(tls)) {
      const rootCert = tls.rootCertificatePath ? fs.readFileSync(tls.rootCertificatePath) : null;
      const clientCert = fs.readFileSync(tls.clientCertificatePath);
      const clientKey = fs.readFileSync(tls.clientKeyPath);

      credentials = grpc.credentials.createSsl(rootCert, clientKey, clientCert);
    } else {
      const rootCert = tls.rootCertificatePath ? fs.readFileSync(tls.rootCertificatePath) : null;
      credentials = grpc.credentials.createSsl(rootCert);
    }

    return credentials;
  }

  private static getChannelOptions(options?: GrpcChannelOptions): ChannelOptions {
    const channelOptions: ChannelOptions = {};

    if (options?.sslTargetNameOverride) {
      channelOptions["grpc.ssl_target_name_override"] = options.sslTargetNameOverride;
    }
    if (options?.authorityOverride) {
      channelOptions["grpc.ssl_target_name_override"] = options.authorityOverride;
      channelOptions["grpc.default_authority"] = options.authorityOverride;
    }

    return channelOptions;
  }

  private static loadClient(packageDefinition: PackageDefinition, requestOptions: GrpcClientRequestOptions) {
    const ast = grpc.loadPackageDefinition(packageDefinition);
    const ServiceClient = _.get(ast, requestOptions.serviceName);

    if (ServiceClient && instanceOfServiceClientConstructor(ServiceClient)) {
      const client = new ServiceClient(
        requestOptions.address,
        this.getChannelCredentials(requestOptions.tls),
        this.getChannelOptions({
          ...requestOptions.tls.channelOptions,
          authorityOverride: requestOptions.authorityOverride,
        })
      );

      if (client[requestOptions.methodName] && typeof client[requestOptions.methodName] === "function") {
        return client;
      }

      throw new Error("No method definition");
    }

    throw new Error("No service definition");
  }

  static async invokeUnaryRequest(
    packageDefinition: PackageDefinition,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, MetadataValue>
  ): Promise<GrpcResponse> {
    const client = this.loadClient(packageDefinition, requestOptions);

    return new Promise((resolve) => {
      const startTime = performance.now();
      client[requestOptions.methodName](
        payload,
        metadata ? MetadataParser.parse(metadata) : new grpc.Metadata(),
        (error: ServerErrorResponse, response: Record<string, unknown>) => {
          const timestamp = Math.trunc(performance.now() - startTime);
          if (error) {
            return resolve({
              timestamp,
              code: error.code || GrpcStatus.UNKNOWN,
              value: {
                code: error.code,
                details: error.details,
                metadata: error.metadata?.toJSON(),
              },
            });
          }

          return resolve({ timestamp, code: GrpcStatus.OK, value: response });
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
          return call.emit("error", {
            code: error.code,
            details: error.details,
            metadata: error.metadata?.toJSON(),
          });
        }

        return call.emit("data", response);
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
