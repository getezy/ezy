import { GrpcClient } from './main/clients/grpc-client/preload';
import { GrpcWebClient } from './main/clients/grpc-web-client/preload';
import { ElectronDialog } from './main/dialog/preload';
import { ElectronStore } from './main/electron-store/preload';
import { OS } from './main/os/preload';
import { Protobuf } from './main/protobuf/preload';

declare global {
  interface Window {
    electronStore: typeof ElectronStore;
    electronDialog: typeof ElectronDialog;
    protobuf: typeof Protobuf;
    clients: {
      grpc: typeof GrpcClient;
      grpcWeb: typeof GrpcWebClient;
    };
    os: typeof OS;
  }
}
