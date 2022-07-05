import { ipcMain } from 'electron';

import { ProtobufLoader } from '../../../core';
import { ProtobufChannel } from './constants';

export const protobufSubscibers = () => {
  ipcMain.handle(
    ProtobufChannel.LOAD_FROM_FILE,
    async (event, path: string, includeDirs?: string[]) => {
      const ast = await ProtobufLoader.loadFromFile(path, includeDirs);

      return ProtobufLoader.parse(ast);
    }
  );
};
