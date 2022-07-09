import { MetadataParser } from '../metadata-parser';

describe('MetadataParser', () => {
  it('should parse metadata when value defined', () => {
    const value = { test: '123' };

    const metadata = MetadataParser.parse(value);

    expect(metadata.get('test')).toEqual(['123']);
  });
});
