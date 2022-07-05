export interface LogItem {
  message: string;
}

export interface LogStorage {
  logs: LogItem[];

  createLog: (log: LogItem) => void;
  clearLogs: () => void;
}
