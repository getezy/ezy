import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { WorkspacesStorage } from './interfaces';

export const useWorkspacesStore = create(
  persist<WorkspacesStorage>(
    (set, get) => ({
      workspaces: [],
      create: (workspace) =>
        set((state) => {
          const { workspaces } = get();

          workspaces.push({ ...workspace, id: nanoid() });

          return { ...state, workspaces: [...workspaces] };
        }),
      remove: (id) =>
        set((state) => {
          const { workspaces } = get();
          return {
            ...state,
            workspaces: workspaces.filter((item) => item.id !== id),
          };
        }),
    }),
    {
      name: 'workspaces',
      getStorage: () => window.electron.store,
    }
  )
);
