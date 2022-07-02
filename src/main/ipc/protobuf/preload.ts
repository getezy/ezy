import { ipcRenderer } from 'electron';

export const protobufPreload = () => ({
  protobuf: {
    loadFromFile(path: string, includeDirs?: string[]) {
      return Promise.resolve().then(() =>
        ipcRenderer.sendSync('protobuf:load-from-file', path, includeDirs)
      );
    },
  },
});
