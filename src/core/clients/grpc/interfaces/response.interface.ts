export interface GrpcResponse<T extends Record<string, unknown> = Record<string, unknown>> {
  timestamp: number;

  value: T;
}
