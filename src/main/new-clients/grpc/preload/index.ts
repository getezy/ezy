import bidirectionalStreaming from './bidirectional-streaming.preload';
import clientStreaming from './client-streaming.preload';
import serverStreaming from './server-streaming.preload';
import unary from './unary.preload';

export const GrpcClient = {
  unary,
  clientStreaming,
  serverStreaming,
  bidirectionalStreaming,
};
