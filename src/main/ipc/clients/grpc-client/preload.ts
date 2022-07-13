/* eslint-disable @typescript-eslint/no-use-before-define */

import { MetadataValue, ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer, IpcRendererEvent } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../core';
import {
  GrpcClientBidirectionalStreamingChannel,
  GrpcClientChannel,
  GrpcClientClientStreamingChannel,
  GrpcClientServerStreamingChannel,
} from './constants';

export type OnDataCallback = (data: Record<string, unknown>) => void;

export type OnErrorCallback = (error: ServerErrorResponse) => void;

export type OnEndCallback = () => void;

function wrapHandler(streamId: string, callback: (...callbackArgs: any[]) => void) {
  return function wrappedHandler(event: IpcRendererEvent, id: string, ...args: any[]) {
    if (streamId === id) {
      callback(...args);
    }
  };
}

export const GrpcClient = {
  unary: {
    invoke<T = Record<string, unknown>>(
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      payload: Record<string, unknown>,
      metadata?: Record<string, MetadataValue>
    ): Promise<T> {
      return ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_UNARY_REQUEST,
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

      const onDataCallback = wrapHandler(streamId, (data: Record<string, unknown>) => {
        onData(data);
      });

      const onErrorCallback = wrapHandler(streamId, (error: ServerErrorResponse) => {
        onError(error);
        removeListeners();
      });

      const onEndCallback = wrapHandler(streamId, () => {
        onEnd();
        removeListeners();
      });

      const onCancelCallback = wrapHandler(streamId, () => {
        removeListeners();
      });

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
  clientStreaming: {
    async invoke(
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      metadata: Record<string, MetadataValue>,
      onData: OnDataCallback,
      onError: OnErrorCallback,
      onEnd: OnEndCallback
    ): Promise<string> {
      const streamId = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_CLIENT_STREAMING_REQUEST,
        options,
        requestOptions,
        metadata
      );

      const onDataCallback = wrapHandler(streamId, (data: Record<string, unknown>) => {
        onData(data);
      });

      const onErrorCallback = wrapHandler(streamId, (error: ServerErrorResponse) => {
        onError(error);
        removeListeners();
      });

      const onEndCallback = wrapHandler(streamId, () => {
        onEnd();
        removeListeners();
      });

      const onCancelCallback = wrapHandler(streamId, () => {
        removeListeners();
      });

      const removeListeners = () => {
        ipcRenderer.removeListener(GrpcClientClientStreamingChannel.DATA, onDataCallback);
        ipcRenderer.removeListener(GrpcClientClientStreamingChannel.ERROR, onErrorCallback);
        ipcRenderer.removeListener(GrpcClientClientStreamingChannel.END, onEndCallback);
        ipcRenderer.removeListener(GrpcClientClientStreamingChannel.CANCEL, onCancelCallback);
      };

      ipcRenderer.on(GrpcClientClientStreamingChannel.DATA, onDataCallback);
      ipcRenderer.on(GrpcClientClientStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcClientClientStreamingChannel.END, onEndCallback);
      ipcRenderer.on(GrpcClientClientStreamingChannel.CANCEL, onCancelCallback);

      return streamId;
    },
    async send(id: string, payload: Record<string, unknown>): Promise<void> {
      await ipcRenderer.invoke(GrpcClientChannel.SEND_CLIENT_STREAMING_REQUEST, id, payload);
    },
    async end(id: string): Promise<void> {
      ipcRenderer.emit(GrpcClientClientStreamingChannel.END, id);
      await ipcRenderer.invoke(GrpcClientChannel.END_CLIENT_STREAMING_REQUEST, id);
    },
    async cancel(id: string): Promise<void> {
      ipcRenderer.emit(GrpcClientClientStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, id);
    },
  },
  bidirectionalStreaming: {
    async invoke(
      options: GrpcOptions,
      requestOptions: GrpcClientRequestOptions,
      metadata: Record<string, MetadataValue>,
      onData: OnDataCallback,
      onError: OnErrorCallback,
      onEnd: OnEndCallback
    ): Promise<string> {
      const streamId = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_BIDIRECTIONAL_STREAMING_REQUEST,
        options,
        requestOptions,
        metadata
      );

      const onDataCallback = wrapHandler(streamId, (data: Record<string, unknown>) => {
        onData(data);
      });

      const onErrorCallback = wrapHandler(streamId, (error: ServerErrorResponse) => {
        onError(error);
        removeListeners();
      });

      const onEndCallback = wrapHandler(streamId, () => {
        onEnd();
        removeListeners();
      });

      const onCancelCallback = wrapHandler(streamId, () => {
        removeListeners();
      });

      const removeListeners = () => {
        ipcRenderer.removeListener(GrpcClientBidirectionalStreamingChannel.DATA, onDataCallback);
        ipcRenderer.removeListener(GrpcClientBidirectionalStreamingChannel.ERROR, onErrorCallback);
        ipcRenderer.removeListener(GrpcClientBidirectionalStreamingChannel.END, onEndCallback);
        ipcRenderer.removeListener(
          GrpcClientBidirectionalStreamingChannel.CANCEL,
          onCancelCallback
        );
      };

      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.DATA, onDataCallback);
      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.END, onEndCallback);
      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.CANCEL, onCancelCallback);

      return streamId;
    },
    async send(id: string, payload: Record<string, unknown>): Promise<void> {
      await ipcRenderer.invoke(GrpcClientChannel.SEND_BIDIRECTIONAL_STREAMING_REQUEST, id, payload);
    },
    async end(id: string): Promise<void> {
      // TODO: When client streaming ends then server does not? If yes, removing listeneres is incorrect
      ipcRenderer.emit(GrpcClientBidirectionalStreamingChannel.END, id);
      await ipcRenderer.invoke(GrpcClientChannel.END_BIDIRECTIONAL_STREAMING_REQUEST, id);
    },
    async cancel(id: string): Promise<void> {
      ipcRenderer.emit(GrpcClientBidirectionalStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_BIDIRECTIONAL_STREAMING_REQUEST, id);
    },
  },
};
