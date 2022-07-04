import { join } from 'path';

import { MethodType } from '../interfaces';
import { ProtobufLoader } from '../protobuf-loader';

describe('ProtobufLoader', () => {
  describe('ProtobufLoader:loadFromFile', () => {
    it('load simple proto', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, './fixtures/proto/simple.proto')
      );

      expect(ast).toBeDefined();
      expect(ast['simple_package.SimpleService']).toBeDefined();
    });

    it('load proto that does not exist', async () => {
      expect(() =>
        ProtobufLoader.loadFromFile(join(__dirname, './fixtures/proto/another.proto'))
      ).rejects.toThrow();
    });
  });

  describe('ProtobufLoader:parse', () => {
    it('should parse basic proto without package defenition', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, './fixtures/proto/basic.proto')
      );

      const packages = ProtobufLoader.parse(ast);

      expect(packages).toEqual([
        {
          name: 'BasicService',
          methods: [
            {
              name: 'BasicRequest',
              type: MethodType.UNARY,
            },
          ],
        },
      ]);
    });

    it('should parse simple proto', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, './fixtures/proto/simple.proto')
      );

      const packages = ProtobufLoader.parse(ast);

      expect(packages).toEqual([
        {
          name: 'simple_package.SimpleService',
          methods: [
            {
              name: 'SimpleUnaryRequest',
              type: MethodType.UNARY,
            },
            {
              name: 'SimpleStreamRequest',
              type: MethodType.STREAM,
            },
          ],
        },
      ]);
    });
  });
});
