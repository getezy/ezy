import type { ServerErrorResponse } from '@grpc/grpc-js';
import { ipcRenderer } from 'electron';

export function useTest(): [
  (
    id: string,
    onDataCallback: (data: Record<string, unknown>) => void,
    onErrorCallback: (error: ServerErrorResponse) => void,
    onEndCallback: () => void
  ) => void,
  (id: string) => void
] {
  const requests = new Map<string, any[]>();

  function add(
    id: string,
    onDataCallback: (data: Record<string, unknown>) => void,
    onErrorCallback: (error: ServerErrorResponse) => void,
    onEndCallback: () => void
  ) {
    // @ts-ignore
    const onData = (_event, requestId, data) => {
      if (id === requestId) {
        onDataCallback(data);
      }
    };

    window.electron.grpcClient.serverStreaming.onData(onData);

    // @ts-ignore
    const onError = (_event, requestId, error) => {
      if (id === requestId) {
        onErrorCallback(error);
      }
    };

    window.electron.grpcClient.serverStreaming.onError(onError);

    // @ts-ignore
    const onEnd = (_event, requestId) => {
      if (id === requestId) {
        onEndCallback();
      }
    };

    window.electron.grpcClient.serverStreaming.onEnd(onEnd);

    requests.set(id, [onData, onError, onEnd]);
  }

  function remove(id: string) {
    const handlers = requests.get(id);

    if (handlers) {
      ipcRenderer.removeListener('grpc-client:send-server-streaming-request:data', handlers[0]);
      ipcRenderer.removeListener('grpc-client:send-server-streaming-request:error', handlers[1]);
      ipcRenderer.removeListener('grpc-client:send-server-streaming-request:end', handlers[2]);
      requests.delete(id);
    }
  }

  return [add, remove];
}
