import { contextBridge } from 'electron';

import { dialogPreload, electronStorePreload, grpcClientPreload, protobufPreload } from './ipc';

const preload = () => {
  contextBridge.exposeInMainWorld('electron', {
    ...electronStorePreload(),
    ...dialogPreload(),
    ...protobufPreload(),
    ...grpcClientPreload(),
  });
};

preload();
