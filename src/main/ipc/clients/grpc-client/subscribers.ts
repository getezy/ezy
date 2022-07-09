import { MetadataValue } from '@grpc/grpc-js';
import { ipcMain } from 'electron';

import { GrpcClient, GrpcOptions, ProtobufLoader } from '../../../../core';
import { GrpcClientChannel } from './constants';

export const grpcClientRegisterSubscibers = () => {
  ipcMain.handle(
    GrpcClientChannel.SEND_UNARY_REQUEST,
    async (
      _event,
      options: GrpcOptions,
      serviceName: string,
      methodName: string,
      address: string,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ) => {
      const ast = await ProtobufLoader.loadFromFile(options);

      return GrpcClient.sendUnaryRequest(ast, serviceName, methodName, address, payload, metadata);
    }
  );
};
