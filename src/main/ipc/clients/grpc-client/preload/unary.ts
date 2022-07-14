import { MetadataValue } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../../core';
import { GrpcClientChannel } from '../constants';

export default {
  invoke<T = Record<string, unknown>>(
    options: GrpcOptions,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, MetadataValue>
  ): Promise<T> {
    return ipcRenderer.invoke(
      GrpcClientChannel.INVOKE_UNARY_REQUEST,
      options,
      requestOptions,
      payload,
      metadata
    );
  },
};
