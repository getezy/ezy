import { ElectronAPI } from '@electron-toolkit/preload';

import { GrpcClient, GrpcWebClient } from '../../main/clients';
import { Database } from '../../main/database/preload';
import { ElectronDialog } from '../../main/dialog';
import { ElectronStore } from '../../main/electron-store';
import { GrpcClient as NewGrpcClient } from '../../main/new-clients';
import { OS } from '../../main/os';
import { Protobuf } from '../../main/protobuf';

declare global {
  interface Window {
    electron: ElectronAPI;

    database: typeof Database;
    electronStore: typeof ElectronStore;
    electronDialog: typeof ElectronDialog;
    protobuf: typeof Protobuf;
    newClients: {
      grpc: typeof NewGrpcClient;
    };
    clients: {
      grpc: typeof GrpcClient;
      grpcWeb: typeof GrpcWebClient;
    };
    os: typeof OS;
  }
}
