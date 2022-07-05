import { contextBridge } from 'electron';

import { dialogPreload, electronStorePreload, protobufPreload } from './ipc';

const preload = () => {
  contextBridge.exposeInMainWorld('electron', {
    ...electronStorePreload(),
    ...dialogPreload(),
    ...protobufPreload(),
  });
};

preload();
