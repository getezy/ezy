export enum GrpcClientChannel {
  SEND_UNARY_REQUEST = 'grpc-client:send-unary-request',
  INVOKE_SERVER_STREAMING_REQUEST = 'grpc-client:invoke-server-streaming-request',
  CANCEL_SERVER_STREAMING_REQUEST = 'grpc-client:cancel-server-streaming-request',
}

export enum GrpcClientServerStreamingChannel {
  DATA = 'grpc-client:server-streaming-request:data',
  ERROR = 'grpc-client:server-streaming-request:error',
  END = 'grpc-client:server-streaming-request:end',
  CANCEL = 'grpc-client:server-streaming-request:cancel',
}
