import { BrowserWindow, dialog, ipcMain, OpenDialogOptions } from 'electron';

export const dialogRegisterSubscibers = (mainWindow: BrowserWindow) => {
  ipcMain.handle('dialog:open', async (_event, options: OpenDialogOptions) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, options);

    if (!canceled) {
      return filePaths;
    }

    return [];
  });
};
