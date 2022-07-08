import { join } from 'path';

import { GrpcMethodType } from '../interfaces';
import { ProtobufLoader } from '../protobuf-loader';

describe('ProtobufLoader', () => {
  describe('ProtobufLoader:loadFromFile', () => {
    it('should load simple proto', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, '../../__tests__/fixtures/proto/simple.proto')
      );

      expect(ast).toBeDefined();
      expect(ast['simple_package.v1.SimpleService']).toBeDefined();
    });

    it('should load proto that does not exist', async () => {
      expect(() =>
        ProtobufLoader.loadFromFile(join(__dirname, '../../__tests__/fixtures/proto/another.proto'))
      ).rejects.toThrow();
    });
  });

  describe('ProtobufLoader:parse', () => {
    it('should parse basic proto without package definition', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, '../../__tests__/fixtures/proto/basic.proto')
      );

      const packages = ProtobufLoader.parse(ast);

      expect(packages).toEqual([
        {
          name: 'BasicService',
          methods: [
            {
              name: 'BasicRequest',
              type: GrpcMethodType.UNARY,
            },
          ],
        },
      ]);
    });

    it('should parse simple proto', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, '../../__tests__/fixtures/proto/simple.proto')
      );

      const packages = ProtobufLoader.parse(ast);

      expect(packages).toEqual([
        {
          name: 'simple_package.v1.SimpleService',
          methods: [
            {
              name: 'SimpleUnaryRequest',
              type: GrpcMethodType.UNARY,
            },
            {
              name: 'SimpleStreamRequest',
              type: GrpcMethodType.STREAM,
            },
          ],
        },
      ]);
    });
  });
});
