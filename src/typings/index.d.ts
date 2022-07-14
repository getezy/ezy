import { GrpcClient } from '../main/ipc/clients/grpc-client/preload';
import { ElectronDialog } from '../main/ipc/dialog/preload';
import { ElectronStore } from '../main/ipc/electron-store/preload';
import { Protobuf } from '../main/ipc/protobuf/preload';

declare global {
  interface Window {
    electronStore: typeof ElectronStore;
    electronDialog: typeof ElectronDialog;
    protobuf: typeof Protobuf;
    clients: {
      grpc: typeof GrpcClient;
    };
  }
}
