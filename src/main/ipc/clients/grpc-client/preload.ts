import { Metadata } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientChannel } from './constants';

export const grpcClientPreload = () => ({
  grpcClient: {
    sendUnaryRequest(
      path: string,
      includeDirs: string[],
      serviceName: string,
      methodName: string,
      address: string,
      payload: Record<string, unknown>,
      metadata?: Metadata
    ) {
      return ipcRenderer.invoke(
        GrpcClientChannel.SEND_UNARY_REQUEST,
        path,
        includeDirs,
        serviceName,
        methodName,
        address,
        payload,
        metadata
      );
    },
  },
});
