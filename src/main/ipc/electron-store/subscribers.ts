import { ipcMain } from 'electron';
import ElectronStore from 'electron-store';

const store = new ElectronStore();

export const electonStoreReigsterSubscibers = () => {
  // IPC listener
  ipcMain.on('electron-store:get', async (event, val) => {
    // eslint-disable-next-line no-param-reassign
    event.returnValue = store.get(val);
  });

  ipcMain.on('electron-store:set', async (event, key, val) => {
    store.set(key, val);
  });

  ipcMain.on('electron-store:remove', async (event, key) => {
    store.reset(key);
  });
};
