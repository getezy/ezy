/* eslint-disable @typescript-eslint/no-use-before-define */

import { MetadataValue, ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer, IpcRendererEvent } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../core';
import { GrpcClientChannel, GrpcClientServerStreamingChannel } from './constants';

export type OnDataCallback = (data: Record<string, unknown>) => void;

export type OnErrorCallback = (error: ServerErrorResponse) => void;

export type OnEndCallback = () => void;

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
    async invoke(
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      payload: Record<string, unknown>,
      metadata: Record<string, MetadataValue>,
      onData: OnDataCallback,
      onError: OnErrorCallback,
      onEnd: OnEndCallback
    ): Promise<string> {
      const streamId = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
        options,
        requestOptions,
        payload,
        metadata
      );

      const onDataCallback = (
        event: IpcRendererEvent,
        id: string,
        data: Record<string, unknown>
      ) => {
        if (id === streamId) {
          onData(data);
        }
      };

      const onErrorCallback = (event: IpcRendererEvent, id: string, error: ServerErrorResponse) => {
        if (id === streamId) {
          onError(error);
          removeListeners();
        }
      };

      const onEndCallback = (event: IpcRendererEvent, id: string) => {
        if (id === streamId) {
          onEnd();
          removeListeners();
        }
      };

      const onCancelCallback = (event: IpcRendererEvent, id: string) => {
        if (id === streamId) {
          removeListeners();
        }
      };

      const removeListeners = () => {
        ipcRenderer.removeListener(GrpcClientServerStreamingChannel.DATA, onDataCallback);
        ipcRenderer.removeListener(GrpcClientServerStreamingChannel.ERROR, onErrorCallback);
        ipcRenderer.removeListener(GrpcClientServerStreamingChannel.END, onEndCallback);
        ipcRenderer.removeListener(GrpcClientServerStreamingChannel.CANCEL, onCancelCallback);
      };

      ipcRenderer.on(GrpcClientServerStreamingChannel.DATA, onDataCallback);
      ipcRenderer.on(GrpcClientServerStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcClientServerStreamingChannel.END, onEndCallback);
      ipcRenderer.on(GrpcClientServerStreamingChannel.CANCEL, onCancelCallback);

      return streamId;
    },
    async cancel(id: string): Promise<void> {
      ipcRenderer.emit(GrpcClientServerStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, id);
    },
  },
};
