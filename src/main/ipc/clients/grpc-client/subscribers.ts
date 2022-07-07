import { Metadata } from '@grpc/grpc-js';
import { ipcMain } from 'electron';

import { GrpcClient, ProtobufLoader } from '../../../../core';
import { GrpcClientChannel } from './constants';

export const grpcClientRegisterSubscibers = () => {
  ipcMain.handle(
    GrpcClientChannel.SEND_UNARY_REQUEST,
    async (
      _event,
      path: string,
      includeDirs: string[],
      serviceName: string,
      methodName: string,
      address: string,
      payload: Record<string, unknown>,
      metadata?: Metadata
    ) => {
      const ast = await ProtobufLoader.loadFromFile(path, includeDirs);

      return GrpcClient.sendUnaryRequest(ast, serviceName, methodName, address, payload, metadata);
    }
  );
};
