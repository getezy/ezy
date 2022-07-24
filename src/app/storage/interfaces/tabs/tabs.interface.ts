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

export function isGrpcTabUnaryCall(
  tab: GrpcTab<GrpcMethodType>
): tab is GrpcTab<GrpcMethodType.UNARY> {
  return tab.info.methodType === GrpcMethodType.UNARY;
}

export function isGrpcTabServerStreamingCall(
  tab: GrpcTab<GrpcMethodType>
): tab is GrpcTab<GrpcMethodType.SERVER_STREAMING> {
  return tab.info.methodType === GrpcMethodType.SERVER_STREAMING;
}

export interface TabsStorage {
  tabs: Tab<CollectionType>[];

  activeTabId: string | undefined;

  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
  moveTab: (currentId: string, overId: string | undefined) => void;

  createGrpcTab: (payload: Pick<GrpcTab<GrpcMethodType>, 'title' | 'type' | 'info'>) => void;
  updateGrpcTabData: <T extends GrpcMethodType>(id: string, data: Partial<GrpcTabData<T>>) => void;
  updateGrpcTabsEnvironment: (currentEnvironmentId: string, newEnvironmentId?: string) => void;
}
