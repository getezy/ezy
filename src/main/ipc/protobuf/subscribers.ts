import { ipcMain } from 'electron';

import { GrpcOptions, ProtobufLoader } from '../../../core';
import { ProtobufChannel } from './constants';

export const protobufRegisterSubscibers = () => {
  ipcMain.handle(ProtobufChannel.LOAD_FROM_FILE, async (_event, options: GrpcOptions) => {
    const ast = await ProtobufLoader.loadFromFile(options);

    return ProtobufLoader.parse(ast);
  });
};
