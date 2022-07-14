import bidirectionalStreaming from './bidirectional-streaming';
import clientStreaming from './client-streaming';
import serverStreaming from './server-streaming';
import unary from './unary';

export const GrpcClient = {
  unary,
  serverStreaming,
  clientStreaming,
  bidirectionalStreaming,
};
