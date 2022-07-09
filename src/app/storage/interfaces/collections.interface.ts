import { GrpcMethodInfo, GrpcOptions, GrpcServiceInfo } from '../../../core/protobuf/interfaces';

export enum CollectionType {
  GRPC = 'grpc',
}

export interface GrpcMethod extends GrpcMethodInfo {
  id: string;
}
export interface GrpcService extends GrpcServiceInfo {
  id: string;
  methods?: GrpcMethod[];
}

export type CollectionChildren<T extends CollectionType> = T extends CollectionType.GRPC
  ? GrpcService[]
  : never;

export type CollectionOptions<T extends CollectionType> = T extends CollectionType.GRPC
  ? GrpcOptions
  : never;

export interface Collection<T extends CollectionType> {
  id: string;
  name: string;
  type: T;
  children?: CollectionChildren<T>;
  options: CollectionOptions<T>;
}

export interface CollectionsStorage {
  collections: Collection<CollectionType>[];

  createCollection: (collection: Omit<Collection<CollectionType>, 'id'>) => Promise<void>;
  updateCollection: (
    id: string,
    collection: Omit<Collection<CollectionType>, 'id'>
  ) => Promise<void>;
  removeCollection: (id: string) => void;
  filterCollections: (search: string) => Collection<CollectionType>[];
}
