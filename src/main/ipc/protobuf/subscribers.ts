import { ipcMain } from 'electron';

import { ProtobufLoader } from '../../../core';

export const protobufSubscibers = () => {
  ipcMain.on('protobuf:load-from-file', async (event, path: string, includeDirs?: string[]) => {
    // eslint-disable-next-line no-param-reassign
    event.returnValue = ProtobufLoader.loadFromFile(path, includeDirs);
  });
};
