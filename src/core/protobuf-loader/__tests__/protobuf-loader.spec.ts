import { join } from 'path';

import { ProtobufLoader } from '../protobuf-loader';

describe('ProtobufLoader', () => {
  it('load simple proto', async () => {
    const proto = await ProtobufLoader.loadFromFile(join(__dirname, './fixtures/simple.proto'));
    expect(proto).toBeDefined();
  });
});
