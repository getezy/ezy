import { AbstractCollection } from '../abstract-collection.entity';
import { CollectionType } from '../collection-type.enum';

class TestCollection extends AbstractCollection {}

describe('AbstractCollection', () => {
  let testCollection: TestCollection;

  beforeEach(() => {
    testCollection = new TestCollection({
      id: '123',
      name: 'test-collection',
      type: CollectionType.Collection,
    });
  });

  test('should have an id property', () => {
    expect(testCollection.id).toBeDefined();
    expect(testCollection.id).toBe('123');
  });

  test('should have a name property', () => {
    expect(testCollection.name).toBeDefined();
    expect(testCollection.name).toBe('test-collection');
  });

  test('should have a type property', () => {
    expect(testCollection.type).toBeDefined();
    expect(testCollection.type).toBe(CollectionType.Collection);
  });
});
