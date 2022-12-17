import { contextBridge } from 'electron';

import { SplashScreen } from './splash-screen';

contextBridge.exposeInMainWorld('splashScreen', SplashScreen);
