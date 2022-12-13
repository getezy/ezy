/**
 * Represents channel from renderer process
 */
export enum GrpcClientChannel {
  INVOKE_UNARY_REQUEST = 'grpc-client-channel:unary-request:invoke',

  INVOKE_SERVER_STREAMING_REQUEST = 'grpc-client-channel:server-streaming-request:invoke',
  CANCEL_SERVER_STREAMING_REQUEST = 'grpc-client-channel:server-streaming-request:cancel',

  INVOKE_CLIENT_STREAMING_REQUEST = 'grpc-client-channel:client-streaming-request:invoke',
  SEND_CLIENT_STREAMING_REQUEST = 'grpc-client-channel:client-streaming-request:send',
  END_CLIENT_STREAMING_REQUEST = 'grpc-client-channel:client-streaming-request:end',
  CANCEL_CLIENT_STREAMING_REQUEST = 'grpc-client-channel:client-streaming-request:cancel',

  INVOKE_BIDIRECTIONAL_STREAMING_REQUEST = 'grpc-client-channel:bidirectional-streaming-request:invoke',
  SEND_BIDIRECTIONAL_STREAMING_REQUEST = 'grpc-client-channel:bidirectional-streaming-request:send',
  END_BIDIRECTIONAL_STREAMING_REQUEST = 'grpc-client-channel:bidirectional-streaming-request:end',
  CANCEL_BIDIRECTIONAL_STREAMING_REQUEST = 'grpc-client-channel:bidirectional-streaming-request:cancel',
}

/**
 * Represents channel from main process
 */
export enum GrpcClientServerStreamingChannel {
  DATA = 'grpc-client:server-streaming-request:data',
  ERROR = 'grpc-client:server-streaming-request:error',
  END = 'grpc-client:server-streaming-request:end',
  CANCEL = 'grpc-client:server-streaming-request:cancel',
}

/**
 * Represents channel from main process
 */
export enum GrpcClientClientStreamingChannel {
  DATA = 'grpc-client:client-streaming-request:data',
  ERROR = 'grpc-client:client-streaming-request:error',
  END = 'grpc-client:client-streaming-request:end',
  CANCEL = 'grpc-client:client-streaming-request:cancel',
}

/**
 * Represents channel from main process
 */
export enum GrpcClientBidirectionalStreamingChannel {
  DATA = 'grpc-client:bidirectional-streaming-request:data',
  ERROR = 'grpc-client:bidirectional-streaming-request:error',
  END = 'grpc-client:bidirectional-streaming-request:end',
  CANCEL = 'grpc-client:bidirectional-streaming-request:cancel',
}
