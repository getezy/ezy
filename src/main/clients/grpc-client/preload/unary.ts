import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions, GrpcResponse } from '@core';

import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientChannel } from '../constants';

export default {
  async invoke<T extends Record<string, unknown> = Record<string, unknown>>(
    options: GrpcOptions,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, unknown>
  ): Promise<GrpcResponse<T>> {
    try {
      const response = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_UNARY_REQUEST,
        options,
        requestOptions,
        payload,
        metadata
      );

      return response;
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
