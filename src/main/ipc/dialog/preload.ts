import { ipcRenderer, OpenDialogOptions } from 'electron';

import { DialogChannel } from './constants';

export const dialogPreload = () => ({
  dialog: {
    open(options: OpenDialogOptions) {
      return ipcRenderer.invoke(DialogChannel.OPEN, options);
    },
  },
});
