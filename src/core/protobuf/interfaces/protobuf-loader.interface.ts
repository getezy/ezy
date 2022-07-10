export enum GrpcMethodType {
  UNARY = 'unary',
  SERVER_STREAMING = 'server-streaming',
  CLIENT_STREAMING = 'client-streaming',
  BIDIRECTIONAL_STREAMING = 'bidirectional-streaming',
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
