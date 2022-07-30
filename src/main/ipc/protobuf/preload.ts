import { ipcRenderer } from 'electron';

import { GrpcOptions, GrpcServiceInfo } from '../../../core';
import { parseErrorFromIPCMain } from '../common';
import { ProtobufChannel } from './constants';

export const Protobuf = {
  async loadFromFile(options: GrpcOptions): Promise<GrpcServiceInfo[]> {
    try {
      const ast = await ipcRenderer.invoke(ProtobufChannel.LOAD_FROM_FILE, options);

      return ast;
    } catch (error) {
      throw new Error(parseErrorFromIPCMain(error));
    }
  },
};
