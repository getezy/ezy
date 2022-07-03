import { ipcMain } from 'electron';
import ElectronStore from 'electron-store';

const store = new ElectronStore();

export const electonStoreReigsterSubscibers = () => {
  ipcMain.handle('electron-store:get', async (_event, value) => store.get(value));

  ipcMain.handle('electron-store:set', async (_event, key, value) => {
    store.set(key, value);
  });

  ipcMain.handle('electron-store:remove', async (_event, key) => {
    store.reset(key);
  });
};
