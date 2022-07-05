import { ipcMain } from 'electron';

export const grpcClientRegisterSubscibers = () => {
  ipcMain.handle('grpc-client:sendUnaryRequest', async () => []);
};
