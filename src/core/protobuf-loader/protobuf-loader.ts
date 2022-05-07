import * as grpc from '@grpc/grpc-js';
import * as protolaoder from '@grpc/proto-loader';

export class ProtobufLoader {
  static async loadFromFile(path: string, importPaths: string[] = []) {
    const packageDefinition = await protolaoder.load(path, {
      defaults: true,
      includeDirs: importPaths,
    });

    const packageObject = grpc.loadPackageDefinition(packageDefinition);

    return packageObject;
  }
}
