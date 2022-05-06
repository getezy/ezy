import create from 'zustand';
import { persist } from 'zustand/middleware';

import { WorkspacesStorage } from './interfaces';

export const useWorkspacesStore = create(
  persist<WorkspacesStorage>(
    () => ({
      workspaces: [],
    }),
    {
      name: 'services',
      getStorage: () => window.electron.store,
    }
  )
);
