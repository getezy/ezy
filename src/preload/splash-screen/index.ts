import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge } from 'electron';

import { ElectronDialog } from '../../main/dialog';
import { SplashScreen } from '../../main/splash-screen';

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('splashScreen', SplashScreen);
    contextBridge.exposeInMainWorld('electronDialog', ElectronDialog);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.splashScreen = SplashScreen;
  // @ts-ignore (define in dts)
  window.electronDialog = ElectronDialog;
}
