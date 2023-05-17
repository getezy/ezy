import { GrpcResponse } from '@getezy/grpc-client';
import { IpcRendererEvent } from 'electron';

export type OnResponseCallback = (response: GrpcResponse) => void;

export type OnErrorCallback = (error: GrpcResponse) => void;

export type OnEndCallback = () => void;

export function wrapHandler(streamId: string, callback: (...callbackArgs: any[]) => void) {
  return function wrappedHandler(_event: IpcRendererEvent, id: string, ...args: any[]) {
    if (streamId === id) {
      callback(...args);
    }
  };
}
