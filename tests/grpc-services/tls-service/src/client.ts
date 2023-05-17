import { ChannelCredentials } from '@grpc/grpc-js';
import * as fs from 'fs';
import * as path from 'path';

import { TLSServiceClient } from './generated/proto/tls_service';

function getChannelCredentials(): ChannelCredentials {
  const rootCert = fs.readFileSync(path.resolve(__dirname, '../certs/ca-cert.pem'));

  if (process.env.TLS_MODE === 'mutual') {
    const clientCert = fs.readFileSync(path.resolve(__dirname, '../certs/client-cert.pem'));
    const clientKey = fs.readFileSync(path.resolve(__dirname, '../certs/client-key.pem'));
    const channelCredentials = ChannelCredentials.createSsl(rootCert, clientKey, clientCert);

    return channelCredentials;
  }

  const channelCredentials = ChannelCredentials.createSsl(rootCert);

  return channelCredentials;
}

function main() {
  const credentials = getChannelCredentials();

  const client = new TLSServiceClient('0.0.0.0:4001', credentials);

  client.unary({ id: 'test' }, (error, response) => {
    // eslint-disable-next-line no-console
    console.log('response: ', response);
  });
}

main();
