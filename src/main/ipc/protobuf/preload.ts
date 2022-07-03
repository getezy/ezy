import { ipcRenderer } from 'electron';

export const protobufPreload = () => ({
  protobuf: {
    loadFromFile(path: string, includeDirs?: string[]) {
      return ipcRenderer.invoke('protobuf:load-from-file', path, includeDirs);
    },
  },
});
