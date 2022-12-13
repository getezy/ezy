import { BrowserWindow, dialog, ipcMain, OpenDialogOptions } from 'electron';

import { DialogChannel } from './constants';

export const registerDialogSubscribers = (mainWindow: BrowserWindow) => {
  ipcMain.handle(DialogChannel.OPEN, async (_event, options: OpenDialogOptions) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, options);

    if (!canceled) {
      return filePaths;
    }

    return [];
  });
};

export const unregisterDialogSubscribers = () => {
  ipcMain.removeHandler(DialogChannel.OPEN);
};
