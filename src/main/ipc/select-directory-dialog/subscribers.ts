import { BrowserWindow, dialog, ipcMain } from 'electron';

export const selectDirectoryDialogReigsterSubscibers = (mainWindow: BrowserWindow) => {
  ipcMain.handle('select-directory-dialog:open', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    if (!canceled) {
      return filePaths;
    }

    return [];
  });
};
