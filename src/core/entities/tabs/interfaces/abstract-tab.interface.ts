import { TabType } from './tab-type.enum';

export interface IAbstractTab {
  id: string;
  title: string;
  type: TabType;
  active: boolean;
  order: number;
}
