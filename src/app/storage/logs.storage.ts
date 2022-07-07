import create from 'zustand';
import { persist } from 'zustand/middleware';

import { LogStorage } from './interfaces';

export const useLogsStore = create(
  persist<LogStorage>(
    (set, get) => ({
      logs: [],
      newLogsAvailable: false,
      createLog: (log) =>
        set((state) => {
          const { logs } = get();

          logs.push(log);

          return { ...state, logs, newLogsAvailable: true };
        }),
      clearLogs: () => set((state) => ({ ...state, logs: [], newLogsAvailable: false })),
      markAsReadLogs: () => set((state) => ({ ...state, newLogsAvailable: false })),
    }),
    {
      name: 'logs',
      getStorage: () => window.electron.store,
    }
  )
);
