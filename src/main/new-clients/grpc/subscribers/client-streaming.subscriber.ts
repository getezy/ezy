import {
  ClientStream,
  GrpcClientFactory,
  GrpcRequestOptions,
  GrpcRequestValue,
} from '@getezy/grpc-client';
import { IpcMain, IpcMainInvokeEvent } from 'electron';
import { v4 as uuid } from 'uuid';

import { GrpcProtocolType } from '@core';

import { GrpcClientChannel, GrpcClientStreamingChannel } from '../constants';
import {
  AbstractProtocolMetadata,
  AbstractProtocolMetadataValue,
  GrpcLoaderType,
  GrpcMetadata,
  LoaderOptions,
  ProtocolOptions,
} from '../interfaces';
import { AbstractSubscriber } from './abstract.subscriber';

export class GrpcClientStreamingSubscriber extends AbstractSubscriber {
  private clientStreamingCalls = new Map<string, ClientStream>();

  public static unregisterCallHandlers(ipcMain: IpcMain) {
    ipcMain.removeHandler(GrpcClientChannel.INVOKE_CLIENT_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.SEND_CLIENT_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.END_CLIENT_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.CANCEL_CLIENT_STREAMING_REQUEST);
  }

  public registerCallHandler() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_CLIENT_STREAMING_REQUEST,
      async <Protocol extends GrpcProtocolType, Loader extends GrpcLoaderType>(
        _event: IpcMainInvokeEvent,
        source: string,
        loaderType: Loader,
        loaderOptions: LoaderOptions<Loader>,
        protocolType: Protocol,
        protocolOptions: ProtocolOptions<Protocol>,
        requestOptions: GrpcRequestOptions,
        metadata?: GrpcMetadata<Protocol>
      ) => {
        const protocol = this.createProtocol(protocolType, protocolOptions);
        const loader = this.createLoader(loaderType, source, loaderOptions);

        const client = await GrpcClientFactory.create<
          AbstractProtocolMetadataValue<typeof protocol>,
          AbstractProtocolMetadata<typeof protocol>
        >(loader, protocol);

        const stream = client.invokeClientStreamingRequest(requestOptions, metadata);

        return this.subscribeOnStreamEvents(stream);
      }
    );

    this.ipcMain.handle(
      GrpcClientChannel.SEND_CLIENT_STREAMING_REQUEST,
      (_event, id: string, payload: GrpcRequestValue) => {
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

  private subscribeOnStreamEvents(call: ClientStream): string {
    const id = uuid();

    call.on('response', (response) => {
      this.mainWindow.webContents.send(GrpcClientStreamingChannel.RESPONSE, id, response);
    });

    call.on('error', (error) => {
      this.mainWindow.webContents.send(GrpcClientStreamingChannel.ERROR, id, error);
      this.clientStreamingCalls.delete(id);
    });

    call.on('end', () => {
      this.mainWindow.webContents.send(GrpcClientStreamingChannel.END, id);
      this.clientStreamingCalls.delete(id);
    });

    this.clientStreamingCalls.set(id, call);

    return id;
  }
}
