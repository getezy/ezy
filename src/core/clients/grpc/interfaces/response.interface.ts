export interface GrpcResponse<T extends Record<string, unknown> = Record<string, unknown>> {
  code: number;

  timestamp: number;

  value: T;
}
