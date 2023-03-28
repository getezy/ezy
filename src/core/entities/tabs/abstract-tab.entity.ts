import { AutoMap } from '@automapper/classes';

import type { IAbstractTab, TabType } from './interfaces';

export abstract class AbstractTab implements IAbstractTab {
  @AutoMap()
  public id: string;

  @AutoMap()
  public title: string;

  @AutoMap()
  public type: TabType;

  @AutoMap()
  public active: boolean;

  @AutoMap()
  public order: number;

  constructor({ id, title, active, type, order }: IAbstractTab) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.active = active;
    this.order = order;
  }

  abstract update(paylod: Partial<IAbstractTab>): void;
}
