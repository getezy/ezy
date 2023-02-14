import { BrowserWindow, ipcMain } from 'electron';

import { GrpcBidirectionalStreamingSubscriber } from './bidirectional-streaming.subscriber';
import { GrpcClientStreamingSubscriber } from './client-streaming.subscriber';
import { GrpcServerStreamingSubscriber } from './server-streaming.subscriber';
import { GrpcUnarySubscriber } from './unary.subscriber';

export const registerGrpcClientSubscribers = (mainWindow: BrowserWindow) => {
  const unary = new GrpcUnarySubscriber(mainWindow, ipcMain);
  const client = new GrpcClientStreamingSubscriber(mainWindow, ipcMain);
  const server = new GrpcServerStreamingSubscriber(mainWindow, ipcMain);
  const bidirectional = new GrpcBidirectionalStreamingSubscriber(mainWindow, ipcMain);

  unary.registerCallHandler();
  client.registerCallHandler();
  server.registerCallHandler();
  bidirectional.registerCallHandler();
};

export const unregisterGrpcClientSubscribers = () => {
  GrpcUnarySubscriber.unregisterCallHandlers(ipcMain);
  GrpcClientStreamingSubscriber.unregisterCallHandlers(ipcMain);
  GrpcServerStreamingSubscriber.unregisterCallHandlers(ipcMain);
  GrpcBidirectionalStreamingSubscriber.unregisterCallHandlers(ipcMain);
};
