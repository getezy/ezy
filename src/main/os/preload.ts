import { ipcRenderer } from 'electron';

import { OSChannel } from './constants';

export const OS = {
  get(): Promise<string> {
    return ipcRenderer.invoke(OSChannel.GET);
  },
};
