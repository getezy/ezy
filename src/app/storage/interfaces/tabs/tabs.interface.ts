import { GrpcMethodType } from '../../../../core/protobuf/interfaces';
import { CollectionType } from '../collections.interface';
import { GrpcTabData, GrpcTabInfo } from './grpc-tab.interface';

export type TabData<T extends CollectionType> = T extends CollectionType.GRPC
  ? GrpcTabData<GrpcMethodType>
  : never;

export type TabInfo<T extends CollectionType> = T extends CollectionType.GRPC
  ? GrpcTabInfo<GrpcMethodType>
  : never;

export interface Tab<T extends CollectionType> {
  id: string;
  title: string;
  type: T;
  info: TabInfo<T>;
  data: TabData<T>;
}

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
