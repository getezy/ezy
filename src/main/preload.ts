import { contextBridge } from 'electron';

import { electronStorePreload, selectDirectoryDialogPreload } from './ipc';

const preload = () => {
  contextBridge.exposeInMainWorld('electron', {
    ...electronStorePreload(),
    ...selectDirectoryDialogPreload(),
  });
};

preload();
