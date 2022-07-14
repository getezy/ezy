/* eslint-disable @typescript-eslint/no-use-before-define */

import { MetadataValue, ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../../core';
import { GrpcClientBidirectionalStreamingChannel, GrpcClientChannel } from '../constants';
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

    const onEndServerCallback = wrapHandler(streamId, () => {
      onEnd();
      removeListeners();
    });

    const onCancelCallback = wrapHandler(streamId, () => {
      removeListeners();
    });

    const removeListeners = () => {
      ipcRenderer.removeListener(GrpcClientBidirectionalStreamingChannel.DATA, onDataCallback);
      ipcRenderer.removeListener(GrpcClientBidirectionalStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.removeListener(GrpcClientBidirectionalStreamingChannel.END, onEndServerCallback);
      ipcRenderer.removeListener(GrpcClientBidirectionalStreamingChannel.CANCEL, onCancelCallback);
    };

    ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.DATA, onDataCallback);
    ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.ERROR, onErrorCallback);
    ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.END, onEndServerCallback);
    ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.CANCEL, onCancelCallback);

    return streamId;
  },
  async send(id: string, payload: Record<string, unknown>): Promise<void> {
    await ipcRenderer.invoke(GrpcClientChannel.SEND_BIDIRECTIONAL_STREAMING_REQUEST, id, payload);
  },
  async end(id: string): Promise<void> {
    // TODO: When client streaming ends then server does not? If yes, removing listeneres is incorrect
    // ipcRenderer.emit(GrpcClientBidirectionalStreamingChannel.END_CLIENT, id);
    await ipcRenderer.invoke(GrpcClientChannel.END_BIDIRECTIONAL_STREAMING_REQUEST, id);
  },
  async cancel(id: string): Promise<void> {
    ipcRenderer.emit(GrpcClientBidirectionalStreamingChannel.CANCEL, id);
    await ipcRenderer.invoke(GrpcClientChannel.CANCEL_BIDIRECTIONAL_STREAMING_REQUEST, id);
  },
};
