import { GrpcMethodType } from '../../../../core/protobuf/interfaces';

export enum GrpcProtocol {
  GRPC = 'grpc',
  GRPC_WEB = 'grpc-web',
}

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
  STARTED = 'started',
  CLIENT_MESSAGE = 'client-message',
  SERVER_MESSAGE = 'server-message',
  ERROR = 'error',
  CLIENT_STREAMING_ENDED = 'client-streaming-ended',
  SERVER_STREAMING_ENDED = 'server-streaming-ended',
  CANCELED = 'canceled',
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
  protocol: GrpcProtocol;
  environmentId?: string;
  url?: string;
  tlsId?: string;

  requestTabs: {
    activeTabId: string | undefined;
    request: GrpcRequest;
    metadata: GrpcRequestMetadata;
  };

  response: GrpcResponse<T>;
}
