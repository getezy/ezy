import React from 'react';
import * as ReactDOM from 'react-dom/client';

import { PackageInfo } from '../core';
import App from './App';

declare global {
  interface Window {
    electron: {
      store: {
        getItem: (key: string) => any;
        setItem: (key: string, value: any) => void;
        removeItem: (key: string) => void;
      };
      selectDirectoryDialog: {
        open: () => Promise<string[]>;
      };
      protobuf: {
        loadFromFile: (path: string, includeDirs?: string[]) => Promise<PackageInfo[]>;
      };
    };
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
