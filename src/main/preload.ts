import { contextBridge } from 'electron';

import { electronStorePreload, protobufPreload, selectDirectoryDialogPreload } from './ipc';

const preload = () => {
  contextBridge.exposeInMainWorld('electron', {
    ...electronStorePreload(),
    ...selectDirectoryDialogPreload(),
    ...protobufPreload(),
  });
};

preload();
