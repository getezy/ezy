import { contextBridge } from 'electron';

import { ElectronDialog, ElectronStore, GrpcClient, Protobuf } from './ipc';

contextBridge.exposeInMainWorld('electronDialog', ElectronDialog);

contextBridge.exposeInMainWorld('electronStore', ElectronStore);

contextBridge.exposeInMainWorld('protobuf', Protobuf);

contextBridge.exposeInMainWorld('clients', {
  grpc: GrpcClient,
});
