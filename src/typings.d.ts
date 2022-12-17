import type { GrpcClient } from './main/clients/grpc-client/preload';
import type { GrpcWebClient } from './main/clients/grpc-web-client/preload';
import type { ElectronDialog } from './main/dialog/preload';
import type { ElectronStore } from './main/electron-store/preload';
import type { OS } from './main/os/preload';
import type { Protobuf } from './main/protobuf/preload';
import type { SplashScreen } from './main/splash-screen/preload';

declare global {
  interface Window {
    // app
    electronStore: typeof ElectronStore;
    electronDialog: typeof ElectronDialog;
    protobuf: typeof Protobuf;
    clients: {
      grpc: typeof GrpcClient;
      grpcWeb: typeof GrpcWebClient;
    };
    os: typeof OS;

    // splash-screen
    splashScreen: typeof SplashScreen;
  }
}
