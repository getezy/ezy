import { MetadataValue, ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer, IpcRendererEvent } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../core';
import { GrpcClientChannel, GrpcClientServerStreamingChannel } from './constants';

export const grpcClientPreload = () => ({
  grpcClient: {
    unaryRequest: {
      send(
        options: GrpcOptions,
        requestOptions: GrpcClientRequestOptions,
        payload: Record<string, unknown>,
        metadata?: Record<string, MetadataValue>
      ) {
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
      send(
        options: GrpcOptions,
        requestOptions: GrpcClientRequestOptions,
        payload: Record<string, unknown>,
        metadata?: Record<string, MetadataValue>
      ) {
        return ipcRenderer.invoke(
          GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
          options,
          requestOptions,
          payload,
          metadata
        );
      },
      cancel(id: string) {
        return ipcRenderer.invoke(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, id);
      },
      onData(
        callback: (event: IpcRendererEvent, id: string, data: Record<string, unknown>) => void
      ) {
        return ipcRenderer.on(GrpcClientServerStreamingChannel.DATA, callback);
      },
      onError(callback: (event: IpcRendererEvent, id: string, error: ServerErrorResponse) => void) {
        return ipcRenderer.on(GrpcClientServerStreamingChannel.ERROR, callback);
      },
      onEnd(callback: (event: IpcRendererEvent, id: string) => void) {
        return ipcRenderer.on(GrpcClientServerStreamingChannel.END, callback);
      },
    },
  },
});
