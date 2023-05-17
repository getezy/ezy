## gRPC

### Server
```bash
  # Generate certs and proto definitions
  $ npm run build

  $ npm run start:server

  # OR

  $ npm run start:mutual
```
### Client
```bash
  $ npm run client:server

  # OR

  $ npm run client:mutual
```

## gRPC-web

### Server
If you want to run default (browser-like) server side TLS

```bash
  $ npm run start:server

  # Server-Side TLS
  $ docker-compose up envoy-server
```

For mutual TLS I found the way when you can start grpc service with Server-Side TLS and then run envoy proxy wich verifying client certificate.

```bash
  $ npm run start:server

  # Mutual TLS
  $ docker-compose up envoy-mutual
```
