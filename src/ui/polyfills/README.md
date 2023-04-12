Polyfills are used here for @getezy/grpc-client library. Because it's node library we can't use it in the renderer (Browser), but we need types, type-guards and enums from it. For Vite bundle we just mock node related modules.

Used with combination of vite-plugin-node-polyfills module.