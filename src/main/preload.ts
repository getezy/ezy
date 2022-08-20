import { contextBridge } from 'electron';

import { ElectronDialog, ElectronStore, GrpcClient, OS, Protobuf } from './ipc';

contextBridge.exposeInMainWorld('electronDialog', ElectronDialog);

contextBridge.exposeInMainWorld('electronStore', ElectronStore);

contextBridge.exposeInMainWorld('protobuf', Protobuf);

contextBridge.exposeInMainWorld('clients', {
  grpc: GrpcClient,
});

contextBridge.exposeInMainWorld('os', OS);
