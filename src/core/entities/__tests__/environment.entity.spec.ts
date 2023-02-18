import { Environment } from '../environments';

describe('Environment', () => {
  it('should create new environment with automatically generated id', () => {
    const environment = Environment.create({ label: 'label', url: 'url', color: 'color' });

    expect(environment).toStrictEqual(
      new Environment({
        id: expect.anything(),
        label: 'label',
        url: 'url',
        color: 'color',
      })
    );
  });
});
