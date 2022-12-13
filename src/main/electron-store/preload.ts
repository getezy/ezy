import { ipcRenderer } from 'electron';

import { ElectronStoreChannel } from './constants';

export const ElectronStore = {
  getItem<T = any>(key: string): Promise<T> {
    return ipcRenderer.invoke(ElectronStoreChannel.GET, key);
  },
  setItem<T = any>(key: string, value: T): Promise<void> {
    setTimeout(() => {
      ipcRenderer.invoke(ElectronStoreChannel.SET, key, value);
    }, 0);

    return Promise.resolve();
  },
  removeItem(key: string): Promise<void> {
    setTimeout(() => {
      ipcRenderer.invoke(ElectronStoreChannel.REMOVE, key);
    }, 0);

    return Promise.resolve();
  },
};
