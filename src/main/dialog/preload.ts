import { ipcRenderer, OpenDialogOptions } from 'electron';

import { DialogChannel } from './constants';

export const ElectronDialog = {
  open(options: OpenDialogOptions): Promise<string[]> {
    return ipcRenderer.invoke(DialogChannel.OPEN, options);
  },
};
