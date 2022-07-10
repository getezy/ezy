import { MetadataValue } from '@grpc/grpc-js';
import { ipcMain } from 'electron';

import {
  GrpcClient,
  GrpcClientRequestOptions,
  GrpcOptions,
  ProtobufLoader,
} from '../../../../core';
import { GrpcClientChannel } from './constants';

export const grpcClientRegisterSubscibers = () => {
  ipcMain.handle(
    GrpcClientChannel.SEND_UNARY_REQUEST,
    async (
      _event,
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ) => {
      const ast = await ProtobufLoader.loadFromFile(options);

      return GrpcClient.sendUnaryRequest(ast, requestOptions, payload, metadata);
    }
  );
};
