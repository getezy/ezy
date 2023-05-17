export enum GrpcMethodType {
  UNARY = 'unary',
  SERVER_STREAMING = 'server-streaming',
  CLIENT_STREAMING = 'client-streaming',
  BIDIRECTIONAL_STREAMING = 'bidirectional-streaming',
}

export type GrpcMethodDefinition = {
  name: string;
  type: GrpcMethodType;
};

export type GrpcServiceDefinition = {
  name: string;
  methods: GrpcMethodDefinition[];
};

export type GrpcOptions = {
  path: string;
  includeDirs?: string[];
};
