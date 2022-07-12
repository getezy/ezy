import { MetadataValue, ServerErrorResponse } from '@grpc/grpc-js';
import { IpcRenderer, ipcRenderer, IpcRendererEvent } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../core';
import { GrpcClientChannel, GrpcClientServerStreamingChannel } from './constants';

export const GrpcClient = {
  unary: {
    invoke<T = Record<string, unknown>>(
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ): Promise<T> {
      return ipcRenderer.invoke(
        GrpcClientChannel.SEND_UNARY_REQUEST,
        options,
        requestOptions,
        payload,
        metadata
      );
    },
  },
  serverStreaming: {
    invoke(
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ): Promise<string> {
      return ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
        options,
        requestOptions,
        payload,
        metadata
      );
    },
    cancel(id: string): Promise<void> {
      return ipcRenderer.invoke(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, id);
    },
    onData(
      callback: (event: IpcRendererEvent, id: string, data: Record<string, unknown>) => void
    ): IpcRenderer {
      return ipcRenderer.on(GrpcClientServerStreamingChannel.DATA, callback);
    },
    onError(
      callback: (event: IpcRendererEvent, id: string, error: ServerErrorResponse) => void
    ): IpcRenderer {
      return ipcRenderer.on(GrpcClientServerStreamingChannel.ERROR, callback);
    },
    onEnd(callback: (event: IpcRendererEvent, id: string) => void): IpcRenderer {
      return ipcRenderer.on(GrpcClientServerStreamingChannel.END, callback);
    },
  },
};
