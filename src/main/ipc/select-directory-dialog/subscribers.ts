import { BrowserWindow, dialog, ipcMain } from 'electron';

export const selectDirectoryDialogReigsterSubscibers = (mainWindow: BrowserWindow) => {
  ipcMain.on('select-directory-dialog:open', async (event) => {
    const dialogResult = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    // eslint-disable-next-line no-param-reassign
    event.returnValue = dialogResult.filePaths;
  });
};
