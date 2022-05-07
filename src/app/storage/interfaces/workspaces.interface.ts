export interface Workspace {
  id: string;
  name: string;
  color: string;
}

export interface WorkspacesStorage {
  workspaces: Workspace[];

  create: (workspace: Omit<Workspace, 'id'>) => void;
  remove: (id: string) => void;
}
