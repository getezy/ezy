import type { MetadataValue, ServerErrorResponse } from '@grpc/grpc-js';
import { IpcRenderer, IpcRendererEvent, OpenDialogOptions } from 'electron';
import React from 'react';
import * as ReactDOM from 'react-dom/client';

import { GrpcClientRequestOptions } from '../core/clients/grpc-client/interfaces';
import { GrpcOptions, GrpcServiceInfo } from '../core/protobuf/interfaces';
import App from './App';

declare global {
  interface Window {
    electron: {
      store: {
        getItem: (key: string) => any;
        setItem: (key: string, value: any) => void;
        removeItem: (key: string) => void;
      };
      dialog: {
        open: (options: OpenDialogOptions) => Promise<string[]>;
      };
      protobuf: {
        loadFromFile: (options: GrpcOptions) => Promise<GrpcServiceInfo[]>;
      };
      grpcClient: {
        unaryRequest: {
          send: (
            options: GrpcOptions,
            requestOptions: GrpcClientRequestOptions,
            payload: Record<string, unknown>,
            metadata?: Record<string, MetadataValue>
          ) => Promise<Record<string, unknown>>;
        };
        serverStreaming: {
          send: (
            options: GrpcOptions,
            requestOptions: GrpcClientRequestOptions,
            payload: Record<string, unknown>,
            metadata?: Record<string, MetadataValue>
          ) => Promise<string>;
          cancel: (id: string) => Promise<void>;
          onData: (
            callback: (event: IpcRendererEvent, id: string, data: Record<string, unknown>) => void
          ) => IpcRenderer;
          onError: (
            callback: (event: IpcRendererEvent, id: string, error: ServerErrorResponse) => void
          ) => IpcRenderer;
          onEnd: (callback: (event: IpcRendererEvent, id: string) => void) => IpcRenderer;
        };
      };
    };
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
