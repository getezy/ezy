import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, shell } from 'electron';
import * as path from 'path';

import {
  registerGrpcClientSubscribers,
  registerGrpcWebClientSubscribers,
  unregisterGrpcClientSubscribers,
  unregisterGrpcWebClientSubscribers,
} from './clients';
import { initDatabase, registerDatabaseSubscribers } from './database';
import { registerDialogSubscribers, unregisterDialogSubscribers } from './dialog';
import { registerElectronStoreSubscribers } from './electron-store';
import { registerOSSubscribers } from './os';
import { registerProtobufSubscribers } from './protobuf';
import { SplashScreenEmitter } from './splash-screen';

registerOSSubscribers();
registerElectronStoreSubscribers();
registerProtobufSubscribers();

const createSplashScreen = (): BrowserWindow => {
  const splashScreen = new BrowserWindow({
    show: false,
    height: 280,
    width: 520,
    resizable: false,
    frame: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/splash.js'),
      sandbox: false,
    },
  });

  splashScreen.on('ready-to-show', () => {
    splashScreen.show();
  });

  splashScreen.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    splashScreen.loadURL(`${process.env.ELECTRON_RENDERER_URL}/splash-screen/index.html`);
  } else {
    splashScreen.loadFile(path.join(__dirname, '../ui/splash-screen/index.html'));
  }

  return splashScreen;
};

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    height: 600,
    width: 1000,
    minHeight: 600,
    minWidth: 800,
    center: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png'),
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/app.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(`${process.env.ELECTRON_RENDERER_URL}/app/index.html`);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../ui/app/index.html'));
  }

  registerDialogSubscribers(mainWindow);
  registerGrpcClientSubscribers(mainWindow);
  registerGrpcWebClientSubscribers(mainWindow);

  mainWindow.on('close', () => {
    unregisterDialogSubscribers();
    unregisterGrpcClientSubscribers();
    unregisterGrpcWebClientSubscribers();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.getezy.ezy');

  const splashScreen = createSplashScreen();

  SplashScreenEmitter.sendLoaderText(splashScreen, 'Initialazing');

  const orm = await initDatabase();

  registerDatabaseSubscribers(orm);

  setTimeout(() => {
    splashScreen.close();

    createWindow();
  }, 2000);

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
