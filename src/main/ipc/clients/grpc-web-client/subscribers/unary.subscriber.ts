import { BrowserWindow, IpcMain } from 'electron';

import {
  GrpcClientRequestOptions,
  GrpcOptions,
  GrpcWebClient,
  GrpcWebMetadataValue,
  ProtobufLoader,
} from '@core';

import { GrpcWebClientChannel } from '../constants';

export class GrpcWebClientUnarySubscriber {
  constructor(private readonly mainWindow: BrowserWindow, private readonly ipcMain: IpcMain) {}

  public registerUnaryCallHandlers() {
    this.ipcMain.handle(
      GrpcWebClientChannel.INVOKE_UNARY_REQUEST,
      async (
        _event,
        options: GrpcOptions,
        requestOptions: GrpcClientRequestOptions,
        payload: Record<string, unknown>,
        metadata?: Record<string, GrpcWebMetadataValue>
      ) => {
        const ast = await ProtobufLoader.loadFromFile(options);

        return GrpcWebClient.invokeUnaryRequest(ast, requestOptions, payload, metadata);
      }
    );
  }
}
