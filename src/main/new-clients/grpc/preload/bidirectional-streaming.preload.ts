/* eslint-disable @typescript-eslint/no-use-before-define */

import { GrpcRequestOptions, GrpcResponse } from '@getezy/grpc-client';
import { ipcRenderer } from 'electron';

import { parseErrorFromIPCMain } from '../../../common';
import { GrpcBidirectionalStreamingChannel, GrpcClientChannel } from '../constants';
import {
  GrpcLoaderType,
  GrpcMetadata,
  GrpcProtocolType,
  LoaderOptions,
  ProtocolOptions,
} from '../interfaces';
import { OnEndCallback, OnErrorCallback, OnResponseCallback, wrapHandler } from './handlers';

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
    onError: OnErrorCallback,
    onEnd: OnEndCallback
  ): Promise<string> {
    try {
      const streamId = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_BIDIRECTIONAL_STREAMING_REQUEST,
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

      const onEndServerCallback = wrapHandler(streamId, () => {
        onEnd();
        removeListeners();
      });

      const onCancelCallback = wrapHandler(streamId, () => {
        removeListeners();
      });

      const removeListeners = () => {
        ipcRenderer.removeListener(GrpcBidirectionalStreamingChannel.RESPONSE, onResponseCallback);
        ipcRenderer.removeListener(GrpcBidirectionalStreamingChannel.ERROR, onErrorCallback);
        ipcRenderer.removeListener(GrpcBidirectionalStreamingChannel.END, onEndServerCallback);
        ipcRenderer.removeListener(GrpcBidirectionalStreamingChannel.CANCEL, onCancelCallback);
      };

      ipcRenderer.on(GrpcBidirectionalStreamingChannel.RESPONSE, onResponseCallback);
      ipcRenderer.on(GrpcBidirectionalStreamingChannel.ERROR, onErrorCallback);
      ipcRenderer.on(GrpcBidirectionalStreamingChannel.END, onEndServerCallback);
      ipcRenderer.on(GrpcBidirectionalStreamingChannel.CANCEL, onCancelCallback);

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
      ipcRenderer.emit(GrpcBidirectionalStreamingChannel.CANCEL, id);
      await ipcRenderer.invoke(GrpcClientChannel.CANCEL_BIDIRECTIONAL_STREAMING_REQUEST, id);
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
