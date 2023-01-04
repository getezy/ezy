import { ElectronAPI } from '@electron-toolkit/preload';

import { ElectronDialog } from '../../main/dialog';
import { SplashScreen } from '../../main/splash-screen';

declare global {
  interface Window {
    electron: ElectronAPI;
    splashScreen: typeof SplashScreen;
    electronDialog: typeof ElectronDialog;
  }
}
