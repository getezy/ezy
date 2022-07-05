import { ipcRenderer } from 'electron';

export const grpcClientPreload = () => ({
  grpcClient: {
    sendUnaryRequest() {
      return ipcRenderer.invoke('grpc-client:sendUnaryRequest');
    },
  },
});
