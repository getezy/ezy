import { GrpcMethodType } from '../../../../core/protobuf/interfaces';
import { CollectionType } from '../collections.interface';
import { GrpcTabData, GrpcTabInfo } from './grpc-tab.interface';

export type Tab<T extends CollectionType, TabInfo = any, TabData = any> = {
  id: string;
  title: string;
  type: T;

  info: TabInfo;
  data: TabData;
};

export type GrpcTab<T extends GrpcMethodType> = Tab<
  CollectionType.GRPC,
  GrpcTabInfo<T>,
  GrpcTabData<T>
>;

export interface TabsStorage {
  tabs: Tab<CollectionType>[];

  activeTabId: string | undefined;

  createGrpcTab: (payload: Pick<Tab<CollectionType.GRPC>, 'title' | 'type' | 'info'>) => void;
  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
  moveTab: (currentId: string, overId: string | undefined) => void;
  updateTab: (tab: Partial<Tab<CollectionType>> & Pick<Tab<CollectionType>, 'id'>) => void;
  updateGrpcTabsEnvironment: (currentEnvironmentId: string, newEnvironmentId?: string) => void;
}
