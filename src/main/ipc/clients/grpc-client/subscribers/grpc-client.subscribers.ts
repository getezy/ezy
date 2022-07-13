import {
  ClientDuplexStream,
  ClientReadableStream,
  ClientWritableStream,
  MetadataValue,
} from '@grpc/grpc-js';
import { BrowserWindow, IpcMain } from 'electron';
import { nanoid } from 'nanoid';

import {
  GrpcClient,
  GrpcClientRequestOptions,
  GrpcOptions,
  ProtobufLoader,
} from '../../../../../core';
import {
  GrpcClientBidirectionalStreamingChannel,
  GrpcClientChannel,
  GrpcClientClientStreamingChannel,
  GrpcClientServerStreamingChannel,
} from '../constants';

export class GrpcClientSubscribers {
  private serverStreamingCalls = new Map<string, ClientReadableStream<Record<string, unknown>>>();

  private clientStreamingCalls = new Map<string, ClientWritableStream<Record<string, unknown>>>();

  private bidirectionalStreamingCalls = new Map<
    string,
    ClientDuplexStream<Record<string, unknown>, Record<string, unknown>>
  >();

  constructor(private readonly mainWindow: BrowserWindow, private readonly ipcMain: IpcMain) {
    this.registerUnaryCallHandlers();
    this.registerServerStreamingHandlers();
    this.registerClientStreamingHandlers();
    this.registerBidirectionalStreamingHandlers();
  }

  private registerUnaryCallHandlers() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_UNARY_REQUEST,
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
  }

  private registerServerStreamingHandlers() {
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

  private registerClientStreamingHandlers() {
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

  private registerBidirectionalStreamingHandlers() {
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
