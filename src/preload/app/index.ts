import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge } from 'electron';

import { GrpcClient, GrpcWebClient } from '../../main/clients';
import { Database } from '../../main/database/preload';
import { ElectronDialog } from '../../main/dialog';
import { ElectronStore } from '../../main/electron-store';
import { GrpcClient as NewGrpcClient } from '../../main/new-clients';
import { OS } from '../../main/os';
import { Protobuf } from '../../main/protobuf';

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);

    contextBridge.exposeInMainWorld('electronDialog', ElectronDialog);

    contextBridge.exposeInMainWorld('electronStore', ElectronStore);

    contextBridge.exposeInMainWorld('protobuf', Protobuf);

    contextBridge.exposeInMainWorld('clients', {
      grpc: GrpcClient,
      grpcWeb: GrpcWebClient,
    });

    contextBridge.exposeInMainWorld('newClients', {
      grpc: NewGrpcClient,
    });

    contextBridge.exposeInMainWorld('os', OS);

    contextBridge.exposeInMainWorld('database', Database);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.electronDialog = ElectronDialog;
  // @ts-ignore (define in dts)
  window.electronStore = ElectronStore;
  // @ts-ignore (define in dts)
  window.protobuf = Protobuf;
  // @ts-ignore (define in dts)
  window.clients = {
    grpc: GrpcClient,
    grpcWeb: GrpcWebClient,
  };
  // @ts-ignore (define in dts)
  window.newClients = {
    grpc: NewGrpcClient,
  };
  // @ts-ignore (define in dts)
  window.os = OS;
  // @ts-ignore (define in dts)
  window.database = Database;
}
