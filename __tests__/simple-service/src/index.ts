import { Server, ServerCredentials } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

import { SimpleMessage, SimpleServiceServer, SimpleServiceService } from './generated/proto/simple';

const SimpleService: SimpleServiceServer = {
  unary(call, callback) {
    callback(null, call.request);
  },

  unaryWithError(call, callback) {
    callback(
      {
        code: Status.NOT_FOUND,
        details: 'Custom error details',
      },
      null
    );
  },

  longIntegers(call, callback) {
    callback(null, call.request);
  },

  clientStreamingRequest(call, callback) {
    const result: string[] = [];

    call.on('data', (data: SimpleMessage) => {
      result.push(data.id.toString());
    });

    call.on('cancelled', () => {
      console.log('cancelled', call.cancelled);
    });

    call.on('end', () => {
      const message = SimpleMessage.fromJSON({ id: result.join(',') });
      callback(null, message);
    });
  },

  clientStreamingRequestWithError(call, callback) {
    const result: string[] = [];

    call.on('data', (data: SimpleMessage) => {
      result.push(data.id.toString());
    });

    call.on('end', () => {
      callback(
        {
          code: Status.PERMISSION_DENIED,
          details: 'Custom error details',
        },
        null
      );
    });
  },

  serverStreamingRequest(call) {
    const random = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < random; i++) {
      const message = SimpleMessage.fromJSON({ id: i.toString() });

      setTimeout(
        (index, data) => {
          call.write(data);
          if (index === random - 1) {
            call.end();
          }
        },
        1000 * (i + 1),
        i,
        message
      );
    }
  },

  bidirectionalStreamingRequest(call) {
    call.on('data', (data: SimpleMessage) => {
      const message = SimpleMessage.fromJSON({ id: data.id.toString() });

      setTimeout(
        (mes) => {
          call.write(mes);
        },
        2000,
        message
      );
    });

    call.on('end', () => {
      setTimeout(() => {
        call.end();
      }, 5000);
    });
  },
};

function main() {
  const server = new Server();

  server.addService(SimpleServiceService, SimpleService);

  server.bindAsync('0.0.0.0:4000', ServerCredentials.createInsecure(), () => {
    server.start();

    // eslint-disable-next-line no-console
    console.log('gRPC server started on 0.0.0.0:4000');
  });
}

main();
