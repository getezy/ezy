import { ipcRenderer } from 'electron';

import { ElectronStoreChannel } from './constants';

export const ElectronStore = {
  getItem<T = any>(key: string): Promise<T> {
    return ipcRenderer.invoke(ElectronStoreChannel.GET, key);
  },
  setItem<T = any>(key: string, value: T): Promise<void> {
    return ipcRenderer.invoke(ElectronStoreChannel.SET, key, value);
  },
  removeItem(key: string): Promise<void> {
    return ipcRenderer.invoke(ElectronStoreChannel.REMOVE, key);
  },
};
