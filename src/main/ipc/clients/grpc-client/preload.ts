import { MetadataValue } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcOptions } from '../../../../core';
import { GrpcClientChannel } from './constants';

export const grpcClientPreload = () => ({
  grpcClient: {
    sendUnaryRequest(
      options: GrpcOptions,
      serviceName: string,
      methodName: string,
      address: string,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ) {
      return ipcRenderer.invoke(
        GrpcClientChannel.SEND_UNARY_REQUEST,
        options,
        serviceName,
        methodName,
        address,
        payload,
        metadata
      );
    },
  },
});
