/* eslint-disable @typescript-eslint/no-use-before-define */

import { GrpcRequestOptions, GrpcRequestValue, GrpcResponse } from '@getezy/grpc-client';
import { ipcRenderer } from 'electron';

import { GrpcProtocolType } from '@core';

import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientChannel, GrpcClientStreamingChannel } from '../constants';
import { GrpcLoaderType, GrpcMetadata, LoaderOptions, ProtocolOptions } from '../interfaces';
import { OnErrorCallback, OnResponseCallback, wrapHandler } from './handlers';

export default {
  async invoke<Protocol extends GrpcProtocolType, Loader extends GrpcLoaderType>(
    source: string,
    loaderType: Loader,
    loaderOptions: LoaderOptions<Loader>,
    protocolType: Protocol,
    protocolOptions: ProtocolOptions<Protocol>,
    requestOptions: GrpcRequestOptions,
    metadata: GrpcMetadata<Protocol>,
    onResponse: OnResponseCallback,
    onError: OnErrorCallback
  ): Promise<string> {
    try {
      const streamId = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_CLIENT_STREAMING_REQUEST,
        source,
        loaderType,
        loaderOptions,
        protocolType,
        protocolOptions,
        requestOptions,
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
        removeListeners();
      });

      const onCancelCallback = wrapHandler(streamId, () => {
        removeListeners();
      });

      const removeListeners = () => {
        ipcRenderer.removeListener(GrpcClientStreamingChannel.RESPONSE, onResponseCallback);
        ipcRenderer.removeListener(GrpcClientStreamingChannel.ERROR, onErrorCallback);
        ipcRenderer.removeListener(GrpcClientStreamingChannel.END, onEndCallback);
        ipcRenderer.removeListener(GrpcClientStreamingChannel.CANCEL, onCancelCallback);
      };

      ipcRenderer.on(GrpcClientStreamingChannel.RESPONSE, onResponseCallback);
      ipcRenderer.on(GrpcClientStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcClientStreamingChannel.END, onEndCallback);
      ipcRenderer.on(GrpcClientStreamingChannel.CANCEL, onCancelCallback);

      return streamId;
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async send(id: string, payload: GrpcRequestValue): Promise<void> {
    try {
      await ipcRenderer.invoke(GrpcClientChannel.SEND_CLIENT_STREAMING_REQUEST, id, payload);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async end(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcClientStreamingChannel.END, id);
      await ipcRenderer.invoke(GrpcClientChannel.END_CLIENT_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },

  async cancel(id: string): Promise<void> {
    try {
      ipcRenderer.emit(GrpcClientStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_CLIENT_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
