import create from 'zustand';
import { persist } from 'zustand/middleware';

import { LogStorage } from './interfaces';

export const useLogsStore = create(
  persist<LogStorage>(
    (set, get) => ({
      logs: [],
      createLog: (log) =>
        set((state) => {
          const { logs } = get();

          logs.push(log);

          return { ...state, logs };
        }),
      clearLogs: () => set((state) => ({ ...state, logs: [] })),
    }),
    {
      name: 'logs',
      getStorage: () => window.electron.store,
    }
  )
);
