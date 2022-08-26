/* eslint-disable @typescript-eslint/no-use-before-define */

import { grpc } from '@improbable-eng/grpc-web';
import { ipcRenderer } from 'electron';

import { GrpcOptions, GrpcWebClientRequestOptions, GrpcWebError } from '../../../../../core';
import { parseErrorFromIPCMain } from '../../../common';
import { GrpcWebClientChannel, GrpcWebClientServerStreamingChannel } from '../constants';
import { OnDataCallback, OnEndCallback, OnErrorCallback, wrapHandler } from './handlers';

export default {
  async invoke(
    options: GrpcOptions,
    requestOptions: GrpcWebClientRequestOptions,
    payload: Record<string, unknown>,
    metadata: grpc.Metadata,
    onData: OnDataCallback,
    onError: OnErrorCallback,
    onEnd: OnEndCallback
  ): Promise<string> {
    try {
      const streamId = await ipcRenderer.invoke(
        GrpcWebClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
        options,
        requestOptions,
        payload,
        metadata
      );

      const onDataCallback = wrapHandler(streamId, (data: Record<string, unknown>) => {
        onData(data);
      });

      const onErrorCallback = wrapHandler(streamId, (error: GrpcWebError) => {
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
        ipcRenderer.removeListener(GrpcWebClientServerStreamingChannel.DATA, onDataCallback);
        ipcRenderer.removeListener(GrpcWebClientServerStreamingChannel.ERROR, onErrorCallback);
        ipcRenderer.removeListener(GrpcWebClientServerStreamingChannel.END, onEndCallback);
        ipcRenderer.removeListener(GrpcWebClientServerStreamingChannel.CANCEL, onCancelCallback);
      };

      ipcRenderer.on(GrpcWebClientServerStreamingChannel.DATA, onDataCallback);
      ipcRenderer.on(GrpcWebClientServerStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcWebClientServerStreamingChannel.END, onEndCallback);
      ipcRenderer.on(GrpcWebClientServerStreamingChannel.CANCEL, onCancelCallback);

      return streamId;
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
  async cancel(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcWebClientServerStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcWebClientChannel.CANCEL_SERVER_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
