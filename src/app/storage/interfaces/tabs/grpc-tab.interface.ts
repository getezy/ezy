import { GrpcMethodType } from '../../../../core/protobuf/interfaces';

export interface GrpcRequest {
  id: string;
  value?: string;
}

export interface GrpcRequestMetadata {
  id: string;
  value?: string;
}

export interface GrpcUnaryResponse {
  id: string;
  value?: string;
}

export enum GrpcStreamMessageType {
  CLIENT_MESSAGE = 'client-message',
  SERVER_MESSAGE = 'server-message',
  STARTED = 'started',
  ENDED = 'ended',
  CANCELED = 'canceled',
  ERROR = 'error',
}

export interface GrpcStreamMessage {
  id: string;
  type: GrpcStreamMessageType;
  value?: string;
}

export interface GrpcStreamResponse {
  id: string;
  messages?: GrpcStreamMessage[];
}

export interface GrpcTabInfo<T extends GrpcMethodType> {
  collectionId: string;
  serviceId: string;
  methodId: string;
  methodType: T;
}

export type GrpcResponse<T extends GrpcMethodType> = T extends GrpcMethodType.UNARY
  ? GrpcUnaryResponse
  : GrpcStreamResponse;

export interface GrpcTabData<T extends GrpcMethodType> {
  environmentId?: string;
  url?: string;

  requestTabs: {
    activeTabId: string | undefined;
    request: GrpcRequest;
    metadata: GrpcRequestMetadata;
  };

  response: GrpcResponse<T>;
}
