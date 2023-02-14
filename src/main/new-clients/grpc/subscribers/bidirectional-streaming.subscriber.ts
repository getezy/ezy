import { BidirectionalStream, GrpcClientFactory, GrpcRequestOptions } from '@getezy/grpc-client';
import { IpcMain, IpcMainInvokeEvent } from 'electron';
import { v4 as uuid } from 'uuid';

import { GrpcBidirectionalStreamingChannel, GrpcClientChannel } from '../constants';
import {
  AbstractProtocolMetadata,
  AbstractProtocolMetadataValue,
  GrpcLoaderType,
  GrpcMetadata,
  GrpcProtocolType,
  LoaderOptions,
  ProtocolOptions,
} from '../interfaces';
import { AbstractSubscriber } from './abstract.subscriber';

export class GrpcBidirectionalStreamingSubscriber extends AbstractSubscriber {
  private bidirectionalStreamingCalls = new Map<string, BidirectionalStream>();

  public static unregisterCallHandlers(ipcMain: IpcMain) {
    ipcMain.removeHandler(GrpcClientChannel.INVOKE_BIDIRECTIONAL_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.SEND_BIDIRECTIONAL_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.END_BIDIRECTIONAL_STREAMING_REQUEST);
    ipcMain.removeHandler(GrpcClientChannel.CANCEL_BIDIRECTIONAL_STREAMING_REQUEST);
  }

  public registerCallHandler() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_BIDIRECTIONAL_STREAMING_REQUEST,
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

        const stream = client.invokeBidirectionalStreamingRequest(requestOptions, metadata);

        return this.subscribeOnStreamEvents(stream);
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

  private subscribeOnStreamEvents(call: BidirectionalStream): string {
    const id = uuid();

    call.on('response', (response) => {
      this.mainWindow.webContents.send(GrpcBidirectionalStreamingChannel.RESPONSE, id, response);
    });

    call.on('error', (error) => {
      this.mainWindow.webContents.send(GrpcBidirectionalStreamingChannel.ERROR, id, error);
      this.bidirectionalStreamingCalls.delete(id);
    });

    call.on('end-server-stream', () => {
      this.mainWindow.webContents.send(GrpcBidirectionalStreamingChannel.END, id);
      this.bidirectionalStreamingCalls.delete(id);
    });

    this.bidirectionalStreamingCalls.set(id, call);

    return id;
  }
}
