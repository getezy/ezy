import { GrpcClientFactory, GrpcRequestOptions, GrpcRequestValue } from '@getezy/grpc-client';
import { IpcMain, IpcMainInvokeEvent } from 'electron';

import { GrpcProtocolType } from '@core';

import { GrpcClientChannel } from '../constants';
import {
  AbstractProtocolMetadata,
  AbstractProtocolMetadataValue,
  GrpcLoaderType,
  GrpcMetadata,
  LoaderOptions,
  ProtocolOptions,
} from '../interfaces';
import { AbstractSubscriber } from './abstract.subscriber';

export class GrpcUnarySubscriber extends AbstractSubscriber {
  public static unregisterCallHandlers(ipcMain: IpcMain) {
    ipcMain.removeHandler(GrpcClientChannel.INVOKE_UNARY_REQUEST);
  }

  public registerCallHandler() {
    this.ipcMain.handle(
      GrpcClientChannel.INVOKE_UNARY_REQUEST,
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

        return client.invokeUnaryRequest(requestOptions, payload, metadata);
      }
    );
  }
}
