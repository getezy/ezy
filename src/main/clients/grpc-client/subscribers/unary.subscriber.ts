import { MetadataValue } from '@grpc/grpc-js';
import { IpcMain } from 'electron';

import { GrpcClient, GrpcClientRequestOptions, GrpcOptions, ProtobufLoader } from '@core';

import { GrpcClientChannel } from '../constants';

export class GrpcClientUnarySubscriber {
  constructor(private readonly ipcMain: IpcMain) {}

  public static unregisterUnaryCallHandlers(ipcMain: IpcMain) {
    ipcMain.removeHandler(GrpcClientChannel.INVOKE_UNARY_REQUEST);
  }

  public registerUnaryCallHandlers() {
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
}
