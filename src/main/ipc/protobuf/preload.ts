import { ipcRenderer } from 'electron';

import { GrpcOptions, GrpcServiceInfo } from '../../../core';
import { ProtobufChannel } from './constants';

export const Protobuf = {
  loadFromFile(options: GrpcOptions): Promise<GrpcServiceInfo[]> {
    return ipcRenderer.invoke(ProtobufChannel.LOAD_FROM_FILE, options);
  },
};
