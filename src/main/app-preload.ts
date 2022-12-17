import { contextBridge } from 'electron';

import { GrpcClient, GrpcWebClient } from './clients';
import { ElectronDialog } from './dialog';
import { ElectronStore } from './electron-store';
import { OS } from './os';
import { Protobuf } from './protobuf';

contextBridge.exposeInMainWorld('electronDialog', ElectronDialog);

contextBridge.exposeInMainWorld('electronStore', ElectronStore);

contextBridge.exposeInMainWorld('protobuf', Protobuf);

contextBridge.exposeInMainWorld('clients', {
  grpc: GrpcClient,
  grpcWeb: GrpcWebClient,
});

contextBridge.exposeInMainWorld('os', OS);
