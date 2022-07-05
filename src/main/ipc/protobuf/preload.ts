import { ipcRenderer } from 'electron';

import { ProtobufChannel } from './constants';

export const protobufPreload = () => ({
  protobuf: {
    loadFromFile(path: string, includeDirs?: string[]) {
      return ipcRenderer.invoke(ProtobufChannel.LOAD_FROM_FILE, path, includeDirs);
    },
  },
});
