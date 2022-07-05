import { ipcRenderer, OpenDialogOptions } from 'electron';

export const dialogPreload = () => ({
  dialog: {
    open(options: OpenDialogOptions) {
      return ipcRenderer.invoke('dialog:open', options);
    },
  },
});
