/* eslint-disable @typescript-eslint/no-use-before-define */

import { GrpcRequestOptions, GrpcRequestValue, GrpcResponse } from '@getezy/grpc-client';
import { ipcRenderer } from 'electron';

import { GrpcProtocolType } from '@core';

import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientChannel, GrpcServerStreamingChannel } from '../constants';
import { GrpcLoaderType, GrpcMetadata, LoaderOptions, ProtocolOptions } from '../interfaces';
import { OnEndCallback, OnErrorCallback, OnResponseCallback, wrapHandler } from './handlers';

export default {
  async invoke<Protocol extends GrpcProtocolType, Loader extends GrpcLoaderType>(
    source: string,
    loaderType: Loader,
    loaderOptions: LoaderOptions<Loader>,
    protocolType: Protocol,
    protocolOptions: ProtocolOptions<Protocol>,
    requestOptions: GrpcRequestOptions,
    payload: GrpcRequestValue,
    metadata: GrpcMetadata<Protocol>,
    onResponse: OnResponseCallback,
    onError: OnErrorCallback,
    onEnd: OnEndCallback
  ): Promise<string> {
    try {
      const streamId = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_SERVER_STREAMING_REQUEST,
        source,
        loaderType,
        loaderOptions,
        protocolType,
        protocolOptions,
        requestOptions,
        payload,
        metadata
      );

      const onResponseCallback = wrapHandler(streamId, (response: GrpcResponse) => {
        onResponse(response);
      });

      const onErrorCallback = wrapHandler(streamId, (error: GrpcResponse) => {
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
        ipcRenderer.removeListener(GrpcServerStreamingChannel.RESPONSE, onResponseCallback);
        ipcRenderer.removeListener(GrpcServerStreamingChannel.ERROR, onErrorCallback);
        ipcRenderer.removeListener(GrpcServerStreamingChannel.END, onEndCallback);
        ipcRenderer.removeListener(GrpcServerStreamingChannel.CANCEL, onCancelCallback);
      };

      ipcRenderer.on(GrpcServerStreamingChannel.RESPONSE, onResponseCallback);
      ipcRenderer.on(GrpcServerStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcServerStreamingChannel.END, onEndCallback);
      ipcRenderer.on(GrpcServerStreamingChannel.CANCEL, onCancelCallback);

      return streamId;
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async cancel(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcServerStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_SERVER_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
