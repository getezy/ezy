/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { LogStorage } from './interfaces';

export const useLogsStore = create(
  persist<LogStorage>(
    (set) => ({
      logs: [],
      newLogsAvailable: false,
      createLog: (log) =>
        set(
          produce<LogStorage>((state) => {
            state.logs.push(log);
            state.newLogsAvailable = true;
          })
        ),
      clearLogs: () =>
        set(
          produce<LogStorage>((state) => {
            state.logs = [];
            state.newLogsAvailable = false;
          })
        ),
      markAsReadLogs: () =>
        set(
          produce<LogStorage>((state) => {
            state.newLogsAvailable = false;
          })
        ),
    }),
    {
      name: 'logs',
      getStorage: () => window.electron.store,
    }
  )
);
