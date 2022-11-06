/* eslint-disable no-console */

import { Server, ServerCredentials } from '@grpc/grpc-js';
import * as fs from 'fs';
import * as path from 'path';

import { TLSServiceServer, TLSServiceService } from './generated/proto/tls_service';

const TLSService: TLSServiceServer = {
  unary(call, callback) {
    callback(null, call.request);
  },
};

function getServerCredentials(): ServerCredentials {
  const serverCert = fs.readFileSync(path.resolve(__dirname, '../certs/server-cert.pem'));
  const serverKey = fs.readFileSync(path.resolve(__dirname, '../certs/server-key.pem'));

  if (process.env.TLS_MODE === 'mutual') {
    const rootCert = fs.readFileSync(path.resolve(__dirname, '../certs/ca-cert.pem'));

    const serverCredentials = ServerCredentials.createSsl(
      rootCert,
      [
        {
          cert_chain: serverCert,
          private_key: serverKey,
        },
      ],
      true
    );

    console.log('Using mutual TLS');
    return serverCredentials;
  }

  const serverCredentials = ServerCredentials.createSsl(
    null,
    [
      {
        cert_chain: serverCert,
        private_key: serverKey,
      },
    ],
    false
  );

  console.log('Using server side TLS');
  return serverCredentials;
}

function main() {
  const server = new Server();

  const serverCredentials = getServerCredentials();

  server.addService(TLSServiceService, TLSService);

  server.bindAsync('0.0.0.0:4001', serverCredentials, () => {
    server.start();

    console.log('gRPC server started on 0.0.0.0:4001');
  });
}

main();
