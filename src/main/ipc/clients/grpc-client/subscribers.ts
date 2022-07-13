import { BrowserWindow, ipcMain } from 'electron';

import { GrpcClientSubscribers } from './subscribers/grpc-client.subscribers';

export const registerGrpcClientSubscribers = (mainWindow: BrowserWindow) =>
  new GrpcClientSubscribers(mainWindow, ipcMain);
