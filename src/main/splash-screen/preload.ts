import { ipcRenderer } from 'electron';

import { SplashScreenChannel } from './constants';

export const SplashScreen = {
  handleLoaderTextChange: (callback: (text: string) => void) =>
    ipcRenderer.on(SplashScreenChannel.LOADER_TEXT_CHANGE, (_event, text) => {
      callback(text);
    }),

  handleError: (callback: (error: string) => void) =>
    ipcRenderer.on(SplashScreenChannel.ERROR, (_event, error) => {
      callback(error);
    }),

  quit(): Promise<void> {
    return ipcRenderer.invoke(SplashScreenChannel.QUIT);
  },
};
