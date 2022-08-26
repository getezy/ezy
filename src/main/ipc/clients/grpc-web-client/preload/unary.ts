import { grpc } from '@improbable-eng/grpc-web';
import { ipcRenderer } from 'electron';

import { GrpcOptions, GrpcWebClientRequestOptions } from '../../../../../core';
import { parseErrorFromIPCMain } from '../../../common';
import { GrpcWebClientChannel } from '../constants';

export default {
  async invoke<T = Record<string, unknown>>(
    options: GrpcOptions,
    requestOptions: GrpcWebClientRequestOptions,
    payload: Record<string, unknown>,
    metadata?: grpc.Metadata
  ): Promise<T> {
    try {
      const response = await ipcRenderer.invoke(
        GrpcWebClientChannel.INVOKE_UNARY_REQUEST,
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
