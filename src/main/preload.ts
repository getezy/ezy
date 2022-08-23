import { contextBridge } from 'electron';

import { ElectronDialog, ElectronStore, GrpcClient, GrpcWebClient, OS, Protobuf } from './ipc';

contextBridge.exposeInMainWorld('electronDialog', ElectronDialog);

contextBridge.exposeInMainWorld('electronStore', ElectronStore);

contextBridge.exposeInMainWorld('protobuf', Protobuf);

contextBridge.exposeInMainWorld('clients', {
  grpc: GrpcClient,
  grpcWeb: GrpcWebClient,
});

contextBridge.exposeInMainWorld('os', OS);
