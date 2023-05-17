/* eslint-disable class-methods-use-this */

import { GrpcProtocol, GrpcWebProtocol, ProtobufLoader } from '@getezy/grpc-client';
import { BrowserWindow, IpcMain } from 'electron';

import { GrpcProtocolType } from '@core';

import { GrpcLoaderType, LoaderOptions, ProtocolOptions } from '../interfaces';

export abstract class AbstractSubscriber {
  constructor(protected readonly mainWindow: BrowserWindow, protected readonly ipcMain: IpcMain) {}

  protected createProtocol<ProtocolType extends GrpcProtocolType>(
    type: ProtocolType,
    options: ProtocolOptions<ProtocolType>
  ) {
    if (type === GrpcProtocolType.GrpcWeb) {
      return new GrpcWebProtocol(options);
    }

    return new GrpcProtocol(options);
  }

  protected createLoader<LoaderType extends GrpcLoaderType>(
    type: GrpcLoaderType,
    source: string,
    options?: LoaderOptions<LoaderType>
  ) {
    if (type === GrpcLoaderType.Protobuf) {
      return new ProtobufLoader(source, options);
    }

    throw new Error('Unrecognized protobuf loader');
  }

  public abstract registerCallHandler(): void;
}
