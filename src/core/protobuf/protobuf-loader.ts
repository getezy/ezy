import type {
  MethodDefinition,
  PackageDefinition,
  ProtobufTypeDefinition,
  ServiceDefinition,
} from '@grpc/proto-loader';
import * as protolaoder from '@grpc/proto-loader';

import { GrpcMethodInfo, GrpcMethodType, GrpcOptions, GrpcServiceInfo } from './interfaces';

function instanceOfProtobufTypeDefinition(object: any): object is ProtobufTypeDefinition {
  return 'type' in object;
}

function instanceOfMethodDefinition(object: any): object is MethodDefinition<object, object> {
  return 'requestType' in object;
}

export class ProtobufLoader {
  static async loadFromFile(options: GrpcOptions): Promise<PackageDefinition> {
    const ast = await protolaoder.load(options.path, {
      includeDirs: options.includeDirs || [],
    });

    return ast;
  }

  static parse(ast: PackageDefinition): GrpcServiceInfo[] {
    const services: GrpcServiceInfo[] = [];

    const packages = Object.keys(ast);
    for (let i = 0; i < packages.length; i++) {
      const astItem = ast[packages[i]];

      if (!instanceOfProtobufTypeDefinition(astItem)) {
        const parsedService = this.parseService(packages[i], astItem);

        services.push(parsedService);
      }
    }

    return services;
  }

  private static parseService(name: string, astService: ServiceDefinition): GrpcServiceInfo {
    const parsedService: GrpcServiceInfo = {
      name,
    };

    const astMethods = Object.keys(astService);

    const methods: GrpcMethodInfo[] = [];

    for (let i = 0; i < astMethods.length; i++) {
      const astItem = astService[astMethods[i]];

      if (instanceOfMethodDefinition(astItem)) {
        const method: GrpcMethodInfo = {
          name: astMethods[i],
          type: this.getMethodType(astItem),
        };

        methods.push(method);
      }
    }

    return {
      ...parsedService,
      methods,
    };
  }

  private static getMethodType(method: MethodDefinition<object, object>): GrpcMethodType {
    if (method.requestStream && method.responseStream) {
      return GrpcMethodType.BIDIRECTIONAL_STREAMING;
    }
    if (method.requestStream) {
      return GrpcMethodType.CLIENT_STREAMING;
    }
    if (method.responseStream) {
      return GrpcMethodType.SERVER_STREAMING;
    }
    return GrpcMethodType.UNARY;
  }
}
