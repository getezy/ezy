import { ipcMain } from 'electron';
import * as os from 'os';

import { OSChannel } from './constants';

export const registerOSSubscribers = () => {
  ipcMain.handle(OSChannel.GET, () => os.platform());
};
