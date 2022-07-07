import { ipcMain } from 'electron';

import { ProtobufLoader } from '../../../core';
import { ProtobufChannel } from './constants';

export const protobufRegisterSubscibers = () => {
  ipcMain.handle(
    ProtobufChannel.LOAD_FROM_FILE,
    async (_event, path: string, includeDirs?: string[]) => {
      const ast = await ProtobufLoader.loadFromFile(path, includeDirs);

      return ProtobufLoader.parse(ast);
    }
  );
};
