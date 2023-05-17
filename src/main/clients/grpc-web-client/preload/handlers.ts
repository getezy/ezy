import { IpcRendererEvent } from 'electron';

import { GrpcWebError } from '@core';

export type OnDataCallback = (data: Record<string, unknown>) => void;

export type OnErrorCallback = (error: GrpcWebError) => void;

export type OnEndCallback = () => void;

export function wrapHandler(streamId: string, callback: (...callbackArgs: any[]) => void) {
  return function wrappedHandler(_event: IpcRendererEvent, id: string, ...args: any[]) {
    if (streamId === id) {
      callback(...args);
    }
  };
}
