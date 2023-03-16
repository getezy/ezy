import { AbstractCollection, IAbstractCollection } from './abstract-collection.entity';
import { isGrpcCollection } from './collection.guards';
import { CollectionType } from './collection-type.enum';
import { GrpcCollection } from './grpc';

export type ICollection = {
  children: AbstractCollection[];
} & Pick<IAbstractCollection, 'id' | 'name'>;

export class Collection extends AbstractCollection implements ICollection {
  public children: AbstractCollection[];

  constructor({ id, name, children }: ICollection) {
    super({ id, name, type: CollectionType.Collection });

    this.children = children.map((child) => {
      if (isGrpcCollection(child)) {
        return new GrpcCollection(child);
      }

      return new Collection(child as Collection);
    });
  }
}
