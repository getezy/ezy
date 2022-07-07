export interface LogItem {
  message: string;
}

export interface LogStorage {
  logs: LogItem[];
  newLogsAvailable: boolean;

  createLog: (log: LogItem) => void;
  clearLogs: () => void;
  markAsReadLogs: () => void;
}
