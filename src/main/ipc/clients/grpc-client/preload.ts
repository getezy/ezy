import { MetadataValue } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../core';
import { GrpcClientChannel } from './constants';

export const grpcClientPreload = () => ({
  grpcClient: {
    sendUnaryRequest(
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ) {
      return ipcRenderer.invoke(
        GrpcClientChannel.SEND_UNARY_REQUEST,
        options,
        requestOptions,
        payload,
        metadata
      );
    },
  },
});
