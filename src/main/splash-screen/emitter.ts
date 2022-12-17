import { BrowserWindow } from 'electron';

import { SplashScreenChannel } from './constants';

export class SplashScreenEmitter {
  static sendLoaderText(window: BrowserWindow, text: string) {
    window.webContents.send(SplashScreenChannel.LOADER_TEXT_CHANGE, text);
  }
}
