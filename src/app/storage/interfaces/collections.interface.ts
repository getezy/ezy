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

export enum CollectionType {
  'GRPC' = 'grpc',
}

export interface Collection<T extends CollectionType> {
  id: string;
  name: string;
  type: T;
  children: T extends CollectionType.GRPC ? GRPCService[] : never;
}

export interface CollectionsStorage {
  collections: Collection<CollectionType>[];

  createCollection: (collection: Omit<Collection<CollectionType>, 'id'>) => void;
  removeCollection: (id: string) => void;
}
