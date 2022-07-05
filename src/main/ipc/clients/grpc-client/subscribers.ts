import { ipcMain } from 'electron';

import { GrpcClientChannel } from './constants';

export const grpcClientRegisterSubscibers = () => {
  ipcMain.handle(GrpcClientChannel.SEND_UNARY_REQUEST, async () => []);
};
