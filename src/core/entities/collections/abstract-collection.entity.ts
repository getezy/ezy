import { CollectionType } from './collection-type.enum';

export interface IAbstractCollection {
  id: string;
  name: string;
  type: CollectionType;
}

export abstract class AbstractCollection implements IAbstractCollection {
  public id: string;

  public name: string;

  public type: CollectionType;

  constructor({ id, name, type }: IAbstractCollection) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
