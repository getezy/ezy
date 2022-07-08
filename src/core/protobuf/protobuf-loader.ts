import type {
  MethodDefinition,
  PackageDefinition,
  ProtobufTypeDefinition,
  ServiceDefinition,
} from '@grpc/proto-loader';
import * as protolaoder from '@grpc/proto-loader';

import { GrpcMethodInfo, GrpcMethodType, GrpcServiceInfo } from './interfaces';

function instanceOfProtobufTypeDefinition(object: any): object is ProtobufTypeDefinition {
  return 'type' in object;
}

function instanceOfMethodDefinition(object: any): object is MethodDefinition<object, object> {
  return 'requestType' in object;
}

export class ProtobufLoader {
  static async loadFromFile(path: string, includeDirs: string[] = []): Promise<PackageDefinition> {
    const ast = await protolaoder.load(path, {
      includeDirs,
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
          type:
            astItem.requestStream || astItem.responseStream
              ? GrpcMethodType.STREAM
              : GrpcMethodType.UNARY,
        };

        methods.push(method);
      }
    }

    return {
      ...parsedService,
      methods,
    };
  }
}
