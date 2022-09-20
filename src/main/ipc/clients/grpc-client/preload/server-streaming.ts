/* eslint-disable @typescript-eslint/no-use-before-define */

import { ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '@core';

import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientChannel, GrpcClientServerStreamingChannel } from '../constants';
import { OnDataCallback, OnEndCallback, OnErrorCallback, wrapHandler } from './handlers';

export default {
  async invoke(
    options: GrpcOptions,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata: Record<string, unknown>,
    onData: OnDataCallback,
    onError: OnErrorCallback,
    onEnd: OnEndCallback
  ): Promise<string> {
    try {
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
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
  async cancel(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcClientServerStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
