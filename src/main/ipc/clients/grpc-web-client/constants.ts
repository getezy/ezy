/**
 * Represents channel from renderer process
 */
export enum GrpcWebClientChannel {
  INVOKE_UNARY_REQUEST = 'grpc-web-client-channel:unary-request:invoke',

  INVOKE_SERVER_STREAMING_REQUEST = 'grpc-web-client-channel:server-streaming-request:invoke',
  CANCEL_SERVER_STREAMING_REQUEST = 'grpc-web-client-channel:server-streaming-request:cancel',
}

/**
 * Represents channel from main process
 */
export enum GrpcWebClientServerStreamingChannel {
  DATA = 'grpc-web-client:server-streaming-request:data',
  ERROR = 'grpc-web-client:server-streaming-request:error',
  END = 'grpc-web-client:server-streaming-request:end',
  CANCEL = 'grpc-web-client:server-streaming-request:cancel',
}
