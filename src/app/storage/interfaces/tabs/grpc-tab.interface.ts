import { GrpcMethodType } from '../../../../core/protobuf/interfaces';

export interface GrpcTabRequest {
  id: string;
  value?: string;
}

export interface GrpcTabRequestMetadata {
  id: string;
  value?: string;
}

export interface GrpcTabUnaryResponse {
  id: string;
  value?: string;
}

export enum GrpcStreamMessageType {
  CLIENT_MESSAGE = 'client-message',
  SERVER_MESSAGE = 'server-message',
  STARTED = 'started',
  ENDED = 'ended',
  CANCELED = 'canceled',
}

export interface GrpcStreamMessage {
  id: string;
  type: GrpcStreamMessageType;
  value: string;
}

export interface GrpcTabStreamResponse {
  id: string;
  messages: GrpcStreamMessage[];
}

export interface GrpcTabInfo<T extends GrpcMethodType> {
  collectionId: string;
  serviceId: string;
  methodId: string;
  methodType: T;
}

export interface GrpcTabData<T extends GrpcMethodType = GrpcMethodType.UNARY> {
  environmentId?: string;
  url?: string;

  requestTabs: {
    activeTabId: string | undefined;
    request: GrpcTabRequest;
    metadata: GrpcTabRequestMetadata;
  };

  response: T extends GrpcMethodType.UNARY ? GrpcTabUnaryResponse : GrpcTabStreamResponse;
}
