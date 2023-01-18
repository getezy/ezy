import { AbstractCollection, IAbstractCollection } from './abstract-collection.entity';
import { CollectionType } from './collection-type.enum';

export type ICollection = {
  children: AbstractCollection[];
} & Pick<IAbstractCollection, 'id' | 'name'>;

export class Collection extends AbstractCollection implements ICollection {
  public children: AbstractCollection[];

  constructor({ id, name, children }: ICollection) {
    super({ id, name, type: CollectionType.Collection });

    this.children = children;
  }
}
