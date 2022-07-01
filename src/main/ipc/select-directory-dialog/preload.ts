import { ipcRenderer } from 'electron';

export const selectDirectoryDialogPreload = () => ({
  selectDirectoryDialog: {
    open() {
      return Promise.resolve().then(() => ipcRenderer.sendSync('select-directory-dialog:open'));
    },
  },
});
