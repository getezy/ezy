import { contextBridge, ipcRenderer } from 'electron';

export const electronStorePreload = () => {
  contextBridge.exposeInMainWorld('electron', {
    store: {
      getItem(val: any) {
        return ipcRenderer.sendSync('electron-store-get', val);
      },
      setItem(property: string, val: any) {
        ipcRenderer.send('electron-store-set', property, val);
      },
      removeItem(property: string) {
        ipcRenderer.send('electron-store-remove', property);
      },
    },
  });
};
