import { ServerErrorResponse } from '@grpc/grpc-js';
import { IpcRendererEvent } from 'electron';

export type OnDataCallback = (data: Record<string, unknown>) => void;

export type OnErrorCallback = (error: ServerErrorResponse) => void;

export type OnEndCallback = () => void;

export function wrapHandler(streamId: string, callback: (...callbackArgs: any[]) => void) {
  return function wrappedHandler(event: IpcRendererEvent, id: string, ...args: any[]) {
    if (streamId === id) {
      callback(...args);
    }
  };
}
