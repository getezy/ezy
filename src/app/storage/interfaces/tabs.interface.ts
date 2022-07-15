import { GrpcMethodType } from '../../../core/protobuf/interfaces';
import { CollectionType } from './collections.interface';

export interface TabRequest {
  id: string;
  value?: string;
}

export interface TabMetadata {
  id: string;
  value?: string;
}

export interface TabResponse {
  id: string;
  value?: string;
}

export interface TabRequestContainer {
  activeTabId: string | undefined;
  request: TabRequest;
  metadata: TabMetadata;
}

export interface GrpcTabInfo {
  serviceId: string;
  methodId: string;
  methodType: GrpcMethodType;
}

export interface BasicTabInfo {
  collectionId: string;
}

export type TabInfo<T extends CollectionType> = T extends CollectionType.GRPC ? GrpcTabInfo : never;

export interface Tab<T extends CollectionType> {
  id: string;
  title: string;
  type: T;
  info: TabInfo<T> & BasicTabInfo;

  environmentId?: string;
  url?: string;

  requestContainer: TabRequestContainer;

  response: TabResponse;
}

export interface UpdateTabsWhere {
  environmentId?: string;
}

export interface TabsStorage {
  tabs: Tab<CollectionType>[];

  activeTabId: string | undefined;

  createTab: (tab: Pick<Tab<CollectionType>, 'title' | 'info' | 'type'>) => void;
  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
  moveTab: (currentId: string, overId: string | undefined) => void;
  updateTab: (tab: Partial<Tab<CollectionType>> & Pick<Tab<CollectionType>, 'id'>) => void;
  updateTabs: (payload: Partial<Omit<Tab<CollectionType>, 'id'>>, where: UpdateTabsWhere) => void;
}
