import {
  GrpcClientFactory,
  GrpcRequestOptions,
  GrpcRequestValue,
  ServerStream,
} from '@getezy/grpc-client';
import { IpcMain, IpcMainInvokeEvent } from 'electron';
import { v4 as uuid } from 'uuid';

import { GrpcProtocolType } from '@core';

import { GrpcClientChannel, GrpcServerStreamingChannel } from '../constants';
import {
  AbstractProtocolMetadata,
  AbstractProtocolMetadataValue,
  GrpcLoaderType,
  GrpcMetadata,
  LoaderOptions,
  ProtocolOptions,
} from '../interfaces';
import { AbstractSubscriber } from './abstract.subscriber';

export class GrpcServerStreamingSubscriber extends AbstractSubscriber {
  private serverStreamingCalls = new Map<string, ServerStream>();

  public static unregisterCallHandlers(ipcMain: IpcMain) {
    ipcMain.removeHandler(GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST);
  }

  public registerCallHandler() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
      async <Protocol extends GrpcProtocolType, Loader extends GrpcLoaderType>(
        _event: IpcMainInvokeEvent,
        source: string,
        loaderType: Loader,
        loaderOptions: LoaderOptions<Loader>,
        protocolType: Protocol,
        protocolOptions: ProtocolOptions<Protocol>,
        requestOptions: GrpcRequestOptions,
        payload: GrpcRequestValue,
        metadata?: GrpcMetadata<Protocol>
      ) => {
        const protocol = this.createProtocol(protocolType, protocolOptions);
        const loader = this.createLoader(loaderType, source, loaderOptions);

        const client = await GrpcClientFactory.create<
          AbstractProtocolMetadataValue<typeof protocol>,
          AbstractProtocolMetadata<typeof protocol>
        >(loader, protocol);

        const stream = client.invokeServerStreamingRequest(requestOptions, payload, metadata);

        return this.subscribeOnStreamEvents(stream);
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

  private subscribeOnStreamEvents(call: ServerStream): string {
    const id = uuid();

    call.on('response', (response) => {
      this.mainWindow.webContents.send(GrpcServerStreamingChannel.RESPONSE, id, response);
    });

    call.on('error', (error) => {
      this.mainWindow.webContents.send(GrpcServerStreamingChannel.ERROR, id, error);
      this.serverStreamingCalls.delete(id);
    });

    call.on('end', () => {
      this.mainWindow.webContents.send(GrpcServerStreamingChannel.END, id);
      this.serverStreamingCalls.delete(id);
    });

    this.serverStreamingCalls.set(id, call);

    return id;
  }
}
