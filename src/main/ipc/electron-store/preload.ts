import { ipcRenderer } from 'electron';

import { ElectronStoreChannel } from './constants';

export const electronStorePreload = () => ({
  store: {
    getItem(value: any) {
      return ipcRenderer.invoke(ElectronStoreChannel.GET, value);
    },
    setItem(key: string, value: any) {
      return ipcRenderer.invoke(ElectronStoreChannel.SET, key, value);
    },
    removeItem(key: string) {
      return ipcRenderer.invoke(ElectronStoreChannel.REMOVE, key);
    },
  },
});
