import { Metadata } from '@grpc/grpc-js';
import { OpenDialogOptions } from 'electron';
import React from 'react';
import * as ReactDOM from 'react-dom/client';

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
        loadFromFile: (path: string, includeDirs?: string[]) => Promise<GrpcServiceInfo[]>;
      };
      grpcClient: {
        sendUnaryRequest: (
          options: GrpcOptions,
          serviceName: string,
          methodName: string,
          address: string,
          payload: Record<string, unknown>,
          metadata?: Metadata
        ) => Promise<Record<string, unknown>>;
      };
    };
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
