import { ipcRenderer } from 'electron';

import { GrpcClientChannel } from './constants';

export const grpcClientPreload = () => ({
  grpcClient: {
    sendUnaryRequest() {
      return ipcRenderer.invoke(GrpcClientChannel.SEND_UNARY_REQUEST);
    },
  },
});
