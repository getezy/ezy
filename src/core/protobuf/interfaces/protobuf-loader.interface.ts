export enum GrpcMethodType {
  UNARY = 'unary',
  STREAM = 'stream',
}

export type GrpcMethodInfo = {
  name: string;
  type: GrpcMethodType;
};

export type GrpcServiceInfo = {
  name: string;
  methods?: GrpcMethodInfo[];
};

export type GrpcOptions = {
  path: string;
  includeDirs?: string[];
};
