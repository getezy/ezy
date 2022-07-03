import { join } from 'path';

import { ProtobufLoader } from '../protobuf-loader';

describe('ProtobufLoader', () => {
  describe('ProtobufLoader:loadFromFile', () => {
    it('load simple proto', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, './fixtures/simple/simple.proto')
      );

      expect(ast).toBeDefined();
      // @ts-ignore
      expect(ast.simple_package.SimpleService).toBeDefined();
    });

    it('load proto that does not exist', async () => {
      expect(() =>
        ProtobufLoader.loadFromFile(join(__dirname, './fixtures/simple/another.proto'))
      ).rejects.toThrow();
    });
  });

  describe('ProtobufLoader:parse', () => {
    it('should parse simple proto', async () => {
      const ast = await ProtobufLoader.loadFromFile(
        join(__dirname, './fixtures/simple/simple.proto')
      );

      const packages = ProtobufLoader.parse(ast);

      expect(packages).toEqual([
        {
          name: 'simple_package',
          services: [
            {
              name: 'SimpleService',
              methods: [
                {
                  name: 'SimpleRequest',
                  isStream: false,
                },
              ],
            },
          ],
        },
      ]);
    });
  });
});
