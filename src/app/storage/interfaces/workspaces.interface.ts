export interface Workspace {
  name: string;
  path: string[];
  includePaths: string[];
}

export interface WorkspacesStorage {
  workspaces: Workspace[];
}
