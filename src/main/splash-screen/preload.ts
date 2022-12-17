import { ipcRenderer } from 'electron';

import { SplashScreenChannel } from './constants';

export const SplashScreen = {
  handleLoaderTextChange: (callback: (text: string) => void) =>
    ipcRenderer.on(SplashScreenChannel.LOADER_TEXT_CHANGE, (_event, text) => {
      callback(text);
    }),
};
