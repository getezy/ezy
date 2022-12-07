import { BrowserWindow, ipcMain } from 'electron';

import { GrpcWebClientServerStreamingSubscriber } from './server-streaming.subscriber';
import { GrpcWebClientUnarySubscriber } from './unary.subscriber';

export const registerGrpcWebClientSubscribers = (mainWindow: BrowserWindow) => {
  const server = new GrpcWebClientServerStreamingSubscriber(mainWindow, ipcMain);
  const unary = new GrpcWebClientUnarySubscriber(mainWindow, ipcMain);

  server.registerServerStreamingHandlers();
  unary.registerUnaryCallHandlers();
};

export const unregisterGrpcWebClientSubscribers = () => {
  GrpcWebClientServerStreamingSubscriber.unregisterServerStreamingHandlers(ipcMain);
  GrpcWebClientUnarySubscriber.unregisterUnaryCallHandlers(ipcMain);
};
