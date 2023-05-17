import { BrowserWindow, ipcMain } from 'electron';

import { GrpcClientBidirectionalSubscriber } from './bidirectional-streaming.subscriber';
import { GrpcClientClientStreamingSubscriber } from './client-streaming.subscriber';
import { GrpcClientServerStreamingSubscriber } from './server-streaming.subscriber';
import { GrpcClientUnarySubscriber } from './unary.subscriber';

export const registerGrpcClientSubscribers = (mainWindow: BrowserWindow) => {
  const bidirectional = new GrpcClientBidirectionalSubscriber(mainWindow, ipcMain);
  const client = new GrpcClientClientStreamingSubscriber(mainWindow, ipcMain);
  const server = new GrpcClientServerStreamingSubscriber(mainWindow, ipcMain);
  const unary = new GrpcClientUnarySubscriber(ipcMain);

  bidirectional.registerBidirectionalStreamingHandlers();
  client.registerClientStreamingHandlers();
  server.registerServerStreamingHandlers();
  unary.registerUnaryCallHandlers();
};

export const unregisterGrpcClientSubscribers = () => {
  GrpcClientBidirectionalSubscriber.unregisterBidirectionalStreamingHandlers(ipcMain);
  GrpcClientClientStreamingSubscriber.unregisterClientStreamingHandlers(ipcMain);
  GrpcClientServerStreamingSubscriber.unregisterServerStreamingHandlers(ipcMain);
  GrpcClientUnarySubscriber.unregisterUnaryCallHandlers(ipcMain);
};
