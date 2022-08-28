## gRPC

```bash
  $ npm run build

  $ npm run start:server
  # OR
  $ npm run start:mutual
```

## gRPC-web
If you want to run default (browser-like) server side TLS

```bash
  # Server-Side TLS
  $ docker-compose up envoy-server
```

For mutual TLS I found the way when you can start grpc service with Server-Side TLS and then run envoy proxy wich verifying client certificate.

```bash
  $ npm run start:server
  $ docker-compose up envoy-mutual
```
