import { BrowserWindow } from 'electron';

import { SplashScreenChannel } from './constants';

export class SplashScreenEmitter {
  static sendLoaderText(window: BrowserWindow, text: string) {
    window.webContents.send(SplashScreenChannel.LOADER_TEXT_CHANGE, text);
  }

  static sendError(window: BrowserWindow, error: any) {
    let message: string;

    if (error instanceof Error) {
      message = JSON.stringify(
        { name: error?.name, message: error?.message, stack: error?.stack, cause: error?.cause },
        null,
        2
      ).replace(/\\n/g, '\n');
    } else {
      message = error.toString();
    }

    window.webContents.send(SplashScreenChannel.ERROR, message);
  }
}
