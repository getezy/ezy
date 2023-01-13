/* eslint-disable import/no-extraneous-dependencies */

import react from '@vitejs/plugin-react-swc';
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite';
import path from 'path';
import { run } from 'vite-plugin-run';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  main: {
    plugins: [
      swcPlugin(),
      externalizeDepsPlugin(),
      run({
        silent: false,
        input: [
          {
            name: 'Building migrations',
            run: ['npm', 'run', 'migrate:build'],
          },
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            src: path.join(__dirname, 'migrations/dist/*'),
            dest: 'migrations',
          },
        ],
      }),
    ],
    build: {
      rollupOptions: {
        external: ['@mikro-orm/sqlite'],
      },
    },
    resolve: {
      alias: {
        '@core': path.resolve('src/core/index.ts'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin(), swcPlugin()],
    build: {
      rollupOptions: {
        input: {
          app: path.resolve(__dirname, 'src/preload/app/index.ts'),
          splash: path.resolve(__dirname, 'src/preload/splash-screen/index.ts'),
        },
      },
    },
    resolve: {
      alias: {
        '@core': path.resolve('src/core/index.ts'),
      },
    },
  },
  renderer: {
    plugins: [react({ tsDecorators: true })],
    root: 'src/ui',
    build: {
      outDir: path.resolve(__dirname, 'out/ui'),
      rollupOptions: {
        input: {
          app: path.resolve(__dirname, 'src/ui/app/index.html'),
          splash: path.resolve(__dirname, 'src/ui/splash-screen/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@core': path.resolve('src/core/types.d.ts'),
        '@components': path.resolve('src/ui/common/components/index.ts'),
        '@themes': path.resolve('src/ui/common/themes/index.ts'),
        '@hooks': path.resolve('src/ui/app/hooks/index.ts'),
        '@new-storage': path.resolve('src/ui/app/new-storage/index.ts'),
        '@storage': path.resolve('src/ui/app/storage/index.ts'),
        '@context': path.resolve('src/ui/app/context/index.ts'),
        '@layouts': path.resolve('src/ui/app/layouts/index.ts'),
        '@api': path.resolve('src/ui/app/api/index.ts'),
      },
    },
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
  },
});
