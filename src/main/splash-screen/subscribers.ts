import { app, ipcMain } from 'electron';

import { SplashScreenChannel } from './constants';

export const registerSplashScreenSubscribers = () => {
  ipcMain.handle(SplashScreenChannel.QUIT, () => app.exit());
};
