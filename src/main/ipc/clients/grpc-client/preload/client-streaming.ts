/* eslint-disable @typescript-eslint/no-use-before-define */

import { MetadataValue, ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../../core';
import { GrpcClientChannel, GrpcClientClientStreamingChannel } from '../constants';
import { OnDataCallback, OnEndCallback, OnErrorCallback, wrapHandler } from './handlers';

export default {
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
};
