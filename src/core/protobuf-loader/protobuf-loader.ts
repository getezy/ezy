import type { GrpcObject, ServiceDefinition } from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import * as protolaoder from '@grpc/proto-loader';

export type Method = {
  name: string;
  isStream: boolean;
};

export type Service = {
  name: string;
  methods?: Method[];
};

export type Package = {
  name: string;
  services?: Service[];
};

export class ProtobufLoader {
  static async loadFromFile(path: string, importPaths: string[] = []): Promise<GrpcObject> {
    const packageDefinition = await protolaoder.load(path, {
      includeDirs: importPaths,
    });

    const ast = grpc.loadPackageDefinition(packageDefinition);

    return ast;
  }

  static parse(ast: GrpcObject): Package[] {
    const result: Package[] = [];

    const packages = Object.keys(ast).filter((item) => item !== 'google');

    for (let i = 0; i < packages.length; i++) {
      const parsedPackage = this.parsePackage(packages[i], ast[packages[i]] as GrpcObject);

      result.push(parsedPackage);
    }

    return result;
  }

  private static parsePackage(name: string, astPackage: GrpcObject): Package {
    const parsedPackage: Package = {
      name,
    };

    const astServices = Object.keys(astPackage).filter(
      // @ts-ignore
      (item) => astPackage[item].serviceName !== undefined
    );

    const services: Service[] = [];

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

  private static parseService(name: string, astService: ServiceDefinition) {
    const parsedService: Service = {
      name,
    };

    const astMethods = Object.keys(astService);

    const methods: Method[] = [];

    for (let i = 0; i < astMethods.length; i++) {
      const method: Method = {
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
