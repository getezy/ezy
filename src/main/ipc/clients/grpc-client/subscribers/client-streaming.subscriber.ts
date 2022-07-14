import { ClientWritableStream, MetadataValue } from '@grpc/grpc-js';
import { BrowserWindow, IpcMain } from 'electron';
import { nanoid } from 'nanoid';

import {
  GrpcClient,
  GrpcClientRequestOptions,
  GrpcOptions,
  ProtobufLoader,
} from '../../../../../core';
import { GrpcClientChannel, GrpcClientClientStreamingChannel } from '../constants';

export class GrpcClientClientStreamingSubscriber {
  private clientStreamingCalls = new Map<string, ClientWritableStream<Record<string, unknown>>>();

  constructor(private readonly mainWindow: BrowserWindow, private readonly ipcMain: IpcMain) {}

  public registerClientStreamingHandlers() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_CLIENT_STREAMING_REQUEST,
      async (
        _event,
        options: GrpcOptions,
        requestOptions: GrpcClientRequestOptions,
        metadata?: Record<string, MetadataValue>
      ) => {
        const ast = await ProtobufLoader.loadFromFile(options);

        const call = GrpcClient.invokeClientStreamingRequest(ast, requestOptions, metadata);

        return this.registerClientStreamingCall(call);
      }
    );

    this.ipcMain.handle(
      GrpcClientChannel.SEND_CLIENT_STREAMING_REQUEST,
      (_event, id: string, payload: Record<string, unknown>) => {
        const call = this.clientStreamingCalls.get(id);

        if (call) {
          call.write(payload);
        }
      }
    );

    this.ipcMain.handle(GrpcClientChannel.END_CLIENT_STREAMING_REQUEST, (_event, id: string) => {
      const call = this.clientStreamingCalls.get(id);

      if (call) {
        call.end();
      }

      this.clientStreamingCalls.delete(id);
    });

    this.ipcMain.handle(GrpcClientChannel.CANCEL_CLIENT_STREAMING_REQUEST, (_event, id: string) => {
      const call = this.clientStreamingCalls.get(id);

      if (call) {
        call.cancel();
      }

      this.clientStreamingCalls.delete(id);
    });
  }

  private registerClientStreamingCall(call: ClientWritableStream<Record<string, unknown>>): string {
    const id = nanoid();

    call.on('data', (data) => {
      this.mainWindow.webContents.send(GrpcClientClientStreamingChannel.DATA, id, data);
    });

    call.on('error', (error) => {
      this.mainWindow.webContents.send(GrpcClientClientStreamingChannel.ERROR, id, error);
      this.clientStreamingCalls.delete(id);
    });

    call.on('end', () => {
      this.mainWindow.webContents.send(GrpcClientClientStreamingChannel.END, id);
      this.clientStreamingCalls.delete(id);
    });

    this.clientStreamingCalls.set(id, call);

    return id;
  }
}
