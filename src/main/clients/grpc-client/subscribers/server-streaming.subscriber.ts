import { ClientReadableStream, MetadataValue } from '@grpc/grpc-js';
import { BrowserWindow, IpcMain } from 'electron';
import { nanoid } from 'nanoid';

import { GrpcClient, GrpcClientRequestOptions, GrpcOptions, ProtobufLoader } from '@core';

import { GrpcClientChannel, GrpcClientServerStreamingChannel } from '../constants';

export class GrpcClientServerStreamingSubscriber {
  private serverStreamingCalls = new Map<string, ClientReadableStream<Record<string, unknown>>>();

  constructor(private readonly mainWindow: BrowserWindow, private readonly ipcMain: IpcMain) {}

  public static unregisterServerStreamingHandlers(ipcMain: IpcMain) {
    ipcMain.removeHandler(GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST);
  }

  public registerServerStreamingHandlers() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
      async (
        _event,
        options: GrpcOptions,
        requestOptions: GrpcClientRequestOptions,
        payload: Record<string, unknown>,
        metadata?: Record<string, MetadataValue>
      ) => {
        const ast = await ProtobufLoader.loadFromFile(options);

        const call = GrpcClient.invokeServerStreamingRequest(
          ast,
          requestOptions,
          payload,
          metadata
        );

        return this.registerServerStreamingCall(call);
      }
    );

    this.ipcMain.handle(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, (_event, id: string) => {
      const call = this.serverStreamingCalls.get(id);

      if (call) {
        call.cancel();
      }

      this.serverStreamingCalls.delete(id);
    });
  }

  private registerServerStreamingCall(call: ClientReadableStream<Record<string, unknown>>): string {
    const id = nanoid();

    call.on('data', (data) => {
      this.mainWindow.webContents.send(GrpcClientServerStreamingChannel.DATA, id, data);
    });

    call.on('error', (error) => {
      this.mainWindow.webContents.send(GrpcClientServerStreamingChannel.ERROR, id, error);
      this.serverStreamingCalls.delete(id);
    });

    call.on('end', () => {
      this.mainWindow.webContents.send(GrpcClientServerStreamingChannel.END, id);
      this.serverStreamingCalls.delete(id);
    });

    this.serverStreamingCalls.set(id, call);

    return id;
  }
}
