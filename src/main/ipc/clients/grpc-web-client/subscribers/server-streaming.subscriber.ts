import { BrowserWindow, IpcMain } from 'electron';
import { ClientReadableStream, Metadata } from 'grpc-web';
import { nanoid } from 'nanoid';

import {
  GrpcOptions,
  GrpcWebClient,
  GrpcWebClientRequestOptions,
  ProtobufLoader,
} from '../../../../../core';
import { GrpcWebClientChannel, GrpcWebClientServerStreamingChannel } from '../constants';

export class GrpcWebClientServerStreamingSubscriber {
  private serverStreamingCalls = new Map<string, ClientReadableStream<Record<string, unknown>>>();

  constructor(private readonly mainWindow: BrowserWindow, private readonly ipcMain: IpcMain) {}

  public registerServerStreamingHandlers() {
    this.ipcMain.handle(
      GrpcWebClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
      async (
        _event,
        options: GrpcOptions,
        requestOptions: GrpcWebClientRequestOptions,
        payload: Record<string, unknown>,
        metadata?: Metadata
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

  private registerServerStreamingCall(call: ClientReadableStream<Record<string, unknown>>): string {
    const id = nanoid();

    call.on('data', (data) => {
      this.mainWindow.webContents.send(GrpcWebClientServerStreamingChannel.DATA, id, data);
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
