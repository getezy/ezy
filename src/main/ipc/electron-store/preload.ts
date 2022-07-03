import { ipcRenderer } from 'electron';

export const electronStorePreload = () => ({
  store: {
    getItem(value: any) {
      return ipcRenderer.invoke('electron-store:get', value);
    },
    setItem(key: string, value: any) {
      return ipcRenderer.invoke('electron-store:set', key, value);
    },
    removeItem(key: string) {
      return ipcRenderer.invoke('electron-store:remove', key);
    },
  },
});
