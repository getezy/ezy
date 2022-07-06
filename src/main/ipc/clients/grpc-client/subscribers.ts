import { ipcMain } from 'electron';

import { GrpcClient, ProtobufLoader } from '../../../../core';
import { GrpcClientChannel } from './constants';

export const grpcClientRegisterSubscibers = () => {
  ipcMain.handle(GrpcClientChannel.SEND_UNARY_REQUEST, async () => {
    const ast = await ProtobufLoader.loadFromFile('path', ['includeDirs']);

    return GrpcClient.sendUnaryRequest(ast, 'Service', 'Method', '127.0.0.1', { id: '1' });
  });
};
