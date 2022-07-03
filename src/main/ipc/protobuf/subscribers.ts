import { ipcMain } from 'electron';

import { ProtobufLoader } from '../../../core';

export const protobufSubscibers = () => {
  ipcMain.handle('protobuf:load-from-file', async (event, path: string, includeDirs?: string[]) => {
    const ast = await ProtobufLoader.loadFromFile(path, includeDirs);

    return ProtobufLoader.parse(ast);
  });
};
