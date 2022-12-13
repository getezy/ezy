/* eslint-disable @typescript-eslint/no-use-before-define */

import { ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '@core';

import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientBidirectionalStreamingChannel, GrpcClientChannel } from '../constants';
import { OnDataCallback, OnEndCallback, OnErrorCallback, wrapHandler } from './handlers';

export default {
  async invoke(
    options: GrpcOptions,
    requestOptions: GrpcClientRequestOptions,
    metadata: Record<string, unknown>,
    onData: OnDataCallback,
    onError: OnErrorCallback,
    onEnd: OnEndCallback
  ): Promise<string> {
    try {
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
        ipcRenderer.removeListener(
          GrpcClientBidirectionalStreamingChannel.END,
          onEndServerCallback
        );
        ipcRenderer.removeListener(
          GrpcClientBidirectionalStreamingChannel.CANCEL,
          onCancelCallback
        );
      };

      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.DATA, onDataCallback);
      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.END, onEndServerCallback);
      ipcRenderer.on(GrpcClientBidirectionalStreamingChannel.CANCEL, onCancelCallback);

      return streamId;
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async send(id: string, payload: Record<string, unknown>): Promise<void> {
    try {
      await ipcRenderer.invoke(GrpcClientChannel.SEND_BIDIRECTIONAL_STREAMING_REQUEST, id, payload);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async end(id: string): Promise<void> {
    try {
      await ipcRenderer.invoke(GrpcClientChannel.END_BIDIRECTIONAL_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async cancel(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcClientBidirectionalStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_BIDIRECTIONAL_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
