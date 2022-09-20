import { BrowserWindow, IpcMain } from 'electron';
import { nanoid } from 'nanoid';

import {
  GrpcClientRequestOptions,
  GrpcOptions,
  GrpcWebCallStream,
  GrpcWebClient,
  GrpcWebMetadataValue,
  ProtobufLoader,
} from '@core';

import { GrpcWebClientChannel, GrpcWebClientServerStreamingChannel } from '../constants';

export class GrpcWebClientServerStreamingSubscriber {
  private serverStreamingCalls = new Map<string, GrpcWebCallStream>();

  constructor(private readonly mainWindow: BrowserWindow, private readonly ipcMain: IpcMain) {}

  public registerServerStreamingHandlers() {
    this.ipcMain.handle(
      GrpcWebClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
      async (
        _event,
        options: GrpcOptions,
        requestOptions: GrpcClientRequestOptions,
        payload: Record<string, unknown>,
        metadata?: Record<string, GrpcWebMetadataValue>
      ) => {
        const ast = await ProtobufLoader.loadFromFile(options);

        const call = GrpcWebClient.invokeServerStreamingRequest(
          ast,
          requestOptions,
          payload,
          metadata
        );

        return this.registerServerStreamingCall(call);
      }
    );

    this.ipcMain.handle(
      GrpcWebClientChannel.CANCEL_SERVER_STREAMING_REQUEST,
      (_event, id: string) => {
        const call = this.serverStreamingCalls.get(id);

        if (call) {
          call.cancel();
        }

        this.serverStreamingCalls.delete(id);
      }
    );
  }

  private registerServerStreamingCall(call: GrpcWebCallStream): string {
    const id = nanoid();

    call.on('message', (message) => {
      this.mainWindow.webContents.send(GrpcWebClientServerStreamingChannel.DATA, id, message);
    });

    call.on('error', (error) => {
      this.mainWindow.webContents.send(GrpcWebClientServerStreamingChannel.ERROR, id, error);
      this.serverStreamingCalls.delete(id);
    });

    call.on('end', () => {
      this.mainWindow.webContents.send(GrpcWebClientServerStreamingChannel.END, id);
      this.serverStreamingCalls.delete(id);
    });

    this.serverStreamingCalls.set(id, call);

    return id;
  }
}
