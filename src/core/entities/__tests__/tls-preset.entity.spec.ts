import { GrpcTlsType } from '@getezy/grpc-client';

import { TlsPreset } from '../tls-presets';

describe('TlsPreset', () => {
  it('should create new tls preset with automatically generated id', () => {
    const preset = TlsPreset.create({
      name: 'name',
      system: false,
      tls: { type: GrpcTlsType.INSECURE },
    });

    expect(preset).toStrictEqual(
      new TlsPreset({
        id: expect.anything(),
        name: 'name',
        system: false,
        tls: { type: GrpcTlsType.INSECURE },
      })
    );
  });
});
