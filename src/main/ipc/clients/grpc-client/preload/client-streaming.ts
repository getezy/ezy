/* eslint-disable @typescript-eslint/no-use-before-define */

import { ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../../core';
import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientChannel, GrpcClientClientStreamingChannel } from '../constants';
import { OnDataCallback, OnErrorCallback, wrapHandler } from './handlers';

export default {
  async invoke(
    options: GrpcOptions,
    requestOptions: GrpcClientRequestOptions,
    metadata: Record<string, unknown>,
    onData: OnDataCallback,
    onError: OnErrorCallback
  ): Promise<string> {
    try {
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
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async send(id: string, payload: Record<string, unknown>): Promise<void> {
    try {
      await ipcRenderer.invoke(GrpcClientChannel.SEND_CLIENT_STREAMING_REQUEST, id, payload);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async end(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcClientClientStreamingChannel.END, id);
      await ipcRenderer.invoke(GrpcClientChannel.END_CLIENT_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async cancel(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcClientClientStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_CLIENT_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
