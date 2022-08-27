import { ipcRenderer } from 'electron';

import { GrpcClientRequestOptions, GrpcOptions } from '../../../../../core';
import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientChannel } from '../constants';

export default {
  async invoke<T = Record<string, unknown>>(
    options: GrpcOptions,
    requestOptions: GrpcClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: Record<string, unknown>
  ): Promise<T> {
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
