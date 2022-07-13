import { ClientReadableStream, MetadataValue } from '@grpc/grpc-js';
import { BrowserWindow, ipcMain } from 'electron';
import { nanoid } from 'nanoid';

import {
  GrpcClient,
  GrpcClientRequestOptions,
  GrpcOptions,
  ProtobufLoader,
} from '../../../../core';
import { GrpcClientChannel, GrpcClientServerStreamingChannel } from './constants';

const serverStreamingRequests = new Map<string, ClientReadableStream<Record<string, unknown>>>();

function registerServerStreamingRequest(
  call: ClientReadableStream<Record<string, unknown>>,
  mainWindow: BrowserWindow
): string {
  const id = nanoid();

  call.on('data', (data) => {
    mainWindow.webContents.send(GrpcClientServerStreamingChannel.DATA, id, data);
  });

  call.on('error', (error) => {
    mainWindow.webContents.send(GrpcClientServerStreamingChannel.ERROR, id, error);
    serverStreamingRequests.delete(id);
  });

  call.on('end', () => {
    mainWindow.webContents.send(GrpcClientServerStreamingChannel.END, id);
    serverStreamingRequests.delete(id);
  });

  serverStreamingRequests.set(id, call);

  return id;
}

export const registerGrpcClientSubscribers = (mainWindow: BrowserWindow) => {
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

      return GrpcClient.invokeUnaryRequest(ast, requestOptions, payload, metadata);
    }
  );

  ipcMain.handle(
    GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
    async (
      _event,
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ) => {
      const ast = await ProtobufLoader.loadFromFile(options);

      const call = GrpcClient.invokeServerStreamingRequest(ast, requestOptions, payload, metadata);

      return registerServerStreamingRequest(call, mainWindow);
    }
  );

  ipcMain.handle(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, (_event, id: string) => {
    const call = serverStreamingRequests.get(id);

    if (call) {
      call.cancel();
    }

    serverStreamingRequests.delete(id);
  });
};
