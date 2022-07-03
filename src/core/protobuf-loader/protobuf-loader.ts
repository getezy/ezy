import type { GrpcObject, ServiceDefinition } from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import * as protolaoder from '@grpc/proto-loader';

import { MethodInfo, PackageInfo, ServiceInfo } from './interfaces';

export class ProtobufLoader {
  static async loadFromFile(path: string, importPaths: string[] = []): Promise<GrpcObject> {
    const packageDefinition = await protolaoder.load(path, {
      includeDirs: importPaths,
    });

    const ast = grpc.loadPackageDefinition(packageDefinition);

    return ast;
  }

  static parse(ast: GrpcObject): PackageInfo[] {
    const result: PackageInfo[] = [];

    const packages = Object.keys(ast).filter((item) => item !== 'google');

    for (let i = 0; i < packages.length; i++) {
      const parsedPackage = this.parsePackage(packages[i], ast[packages[i]] as GrpcObject);

      result.push(parsedPackage);
    }

    return result;
  }

  private static parsePackage(name: string, astPackage: GrpcObject): PackageInfo {
    const parsedPackage: PackageInfo = {
      name,
    };

    const astServices = Object.keys(astPackage).filter(
      // @ts-ignore
      (item) => astPackage[item].serviceName !== undefined
    );

    const services: ServiceInfo[] = [];

    for (let i = 0; i < astServices.length; i++) {
      const service = this.parseService(
        astServices[i],
        // @ts-ignore
        astPackage[astServices[i]].service as ServiceDefinition
      );

      services.push(service);
    }

    return {
      ...parsedPackage,
      services,
    };
  }

  private static parseService(name: string, astService: ServiceDefinition): ServiceInfo {
    const parsedService: ServiceInfo = {
      name,
    };

    const astMethods = Object.keys(astService);

    const methods: MethodInfo[] = [];

    for (let i = 0; i < astMethods.length; i++) {
      const method: MethodInfo = {
        name: astMethods[i],
        isStream:
          astService[astMethods[i]]?.requestStream || astService[astMethods[i]]?.responseStream,
      };

      methods.push(method);
    }

    return {
      ...parsedService,
      methods,
    };
  }
}
