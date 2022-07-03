import { ipcRenderer } from 'electron';

export const selectDirectoryDialogPreload = () => ({
  selectDirectoryDialog: {
    open() {
      return ipcRenderer.invoke('select-directory-dialog:open');
    },
  },
});
