import { ipcMain } from 'electron';
import ElectronStore from 'electron-store';

import { ElectronStoreChannel } from './constants';

const store = new ElectronStore();

export const registerElectronStoreSubscribers = () => {
  ipcMain.handle(ElectronStoreChannel.GET, async (_event, value) => store.get(value));

  ipcMain.handle(ElectronStoreChannel.SET, async (_event, key, value) => {
    store.set(key, value);
  });

  ipcMain.handle(ElectronStoreChannel.REMOVE, async (_event, key) => {
    store.reset(key);
  });
};
