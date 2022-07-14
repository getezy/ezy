import { ClientDuplexStream, MetadataValue } from '@grpc/grpc-js';
import { BrowserWindow, IpcMain } from 'electron';
import { nanoid } from 'nanoid';

import {
  GrpcClient,
  GrpcClientRequestOptions,
  GrpcOptions,
  ProtobufLoader,
} from '../../../../../core';
import { GrpcClientBidirectionalStreamingChannel, GrpcClientChannel } from '../constants';

export class GrpcClientBidirectionalSubscriber {
  private bidirectionalStreamingCalls = new Map<
    string,
    ClientDuplexStream<Record<string, unknown>, Record<string, unknown>>
  >();

  constructor(private readonly mainWindow: BrowserWindow, private readonly ipcMain: IpcMain) {}

  public registerBidirectionalStreamingHandlers() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_BIDIRECTIONAL_STREAMING_REQUEST,
      async (
        _event,
        options: GrpcOptions,
        requestOptions: GrpcClientRequestOptions,
        metadata?: Record<string, MetadataValue>
      ) => {
        const ast = await ProtobufLoader.loadFromFile(options);

        const call = GrpcClient.invokeBidirectionalStreamingRequest(ast, requestOptions, metadata);

        return this.registerBidirectionalStreamingCall(call);
      }
    );

    this.ipcMain.handle(
      GrpcClientChannel.SEND_BIDIRECTIONAL_STREAMING_REQUEST,
      (_event, id: string, payload: Record<string, unknown>) => {
        const call = this.bidirectionalStreamingCalls.get(id);

        if (call) {
          call.write(payload);
        }
      }
    );

    this.ipcMain.handle(
      GrpcClientChannel.END_BIDIRECTIONAL_STREAMING_REQUEST,
      (_event, id: string) => {
        const call = this.bidirectionalStreamingCalls.get(id);

        if (call) {
          call.end();
        }

        this.bidirectionalStreamingCalls.delete(id);
      }
    );

    this.ipcMain.handle(
      GrpcClientChannel.CANCEL_BIDIRECTIONAL_STREAMING_REQUEST,
      (_event, id: string) => {
        const call = this.bidirectionalStreamingCalls.get(id);

        if (call) {
          call.cancel();
        }

        this.bidirectionalStreamingCalls.delete(id);
      }
    );
  }

  private registerBidirectionalStreamingCall(
    call: ClientDuplexStream<Record<string, unknown>, Record<string, unknown>>
  ): string {
    const id = nanoid();

    call.on('data', (data) => {
      this.mainWindow.webContents.send(GrpcClientBidirectionalStreamingChannel.DATA, id, data);
    });

    call.on('error', (error) => {
      this.mainWindow.webContents.send(GrpcClientBidirectionalStreamingChannel.ERROR, id, error);
      this.bidirectionalStreamingCalls.delete(id);
    });

    call.on('end', () => {
      this.mainWindow.webContents.send(GrpcClientBidirectionalStreamingChannel.END, id);
      this.bidirectionalStreamingCalls.delete(id);
    });

    this.bidirectionalStreamingCalls.set(id, call);

    return id;
  }
}
