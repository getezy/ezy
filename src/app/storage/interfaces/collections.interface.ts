export enum CollectionType {
  GRPC = 'grpc',
}

export enum GRPCMethodType {
  UNARY = 'unary',
  STREAM = 'stream',
}

export interface GRPCMethod {
  id: string;
  name: string;
  type: GRPCMethodType;
}
export interface GRPCService {
  id: string;
  name: string;
  methods: GRPCMethod[];
}

export interface GRPCPackage {
  id: string;
  name: string;
  services: GRPCService[];
}

export interface GRPCCollectionOptions {
  path: string;
  includeDirs?: string[];
}

export type CollectionChildren<T extends CollectionType> = T extends CollectionType.GRPC
  ? GRPCPackage[]
  : never;

export type CollectionOptions<T extends CollectionType> = T extends CollectionType.GRPC
  ? GRPCCollectionOptions
  : never;

export interface Collection<T extends CollectionType> {
  id: string;
  name: string;
  type: T;
  children: CollectionChildren<T>;
  options: CollectionOptions<T>;
}

export interface CollectionsStorage {
  collections: Collection<CollectionType>[];

  createCollection: (collection: Omit<Collection<CollectionType>, 'id'>) => void;
  updateCollection: (id: string, payload: Partial<Omit<Collection<CollectionType>, 'id'>>) => void;
  removeCollection: (id: string) => void;
}
