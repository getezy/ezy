import { AutoMap } from '@automapper/classes';

export class Environment {
  @AutoMap()
  id!: string;

  @AutoMap()
  label!: string;

  @AutoMap()
  url!: string;

  @AutoMap()
  color!: string;
}
