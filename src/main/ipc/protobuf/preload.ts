import { ipcRenderer } from 'electron';

import { GrpcOptions } from '../../../core';
import { ProtobufChannel } from './constants';

export const protobufPreload = () => ({
  protobuf: {
    loadFromFile(options: GrpcOptions) {
      return ipcRenderer.invoke(ProtobufChannel.LOAD_FROM_FILE, options);
    },
  },
});
