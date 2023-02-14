import {
  GrpcRequestOptions,
  GrpcRequestValue,
  GrpcResponse,
  GrpcResponseValue,
} from '@getezy/grpc-client';
import { ipcRenderer } from 'electron';

import { parseErrorFromIPCMain } from '../../../common';
import { GrpcClientChannel } from '../constants';
import {
  GrpcLoaderType,
  GrpcMetadata,
  GrpcProtocolType,
  LoaderOptions,
  ProtocolOptions,
} from '../interfaces';

export default {
  async invoke<
    Protocol extends GrpcProtocolType,
    Loader extends GrpcLoaderType,
    Response extends GrpcResponseValue = GrpcResponseValue
  >(
    source: string,
    loaderType: Loader,
    loaderOptions: LoaderOptions<Loader>,
    protocolType: Protocol,
    protocolOptions: ProtocolOptions<Protocol>,
    requestOptions: GrpcRequestOptions,
    payload: GrpcRequestValue,
    metadata?: GrpcMetadata<Protocol>
  ): Promise<GrpcResponse<Response>> {
    try {
      const response = await ipcRenderer.invoke(
        GrpcClientChannel.INVOKE_UNARY_REQUEST,
        source,
        loaderType,
        loaderOptions,
        protocolType,
        protocolOptions,
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
