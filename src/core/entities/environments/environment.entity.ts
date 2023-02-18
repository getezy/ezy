import { AutoMap } from '@automapper/classes';
import { v4 as uuid } from 'uuid';

import { IEnvironment } from './interfaces';

export class Environment implements IEnvironment {
  @AutoMap()
  id: string;

  @AutoMap()
  label: string;

  @AutoMap()
  url: string;

  @AutoMap()
  color: string;

  static create(data: Omit<IEnvironment, 'id'>) {
    return new Environment({
      id: uuid(),
      ...data,
    });
  }

  constructor({ id, label, url, color }: IEnvironment) {
    this.id = id;
    this.label = label;
    this.url = url;
    this.color = color;
  }
}
