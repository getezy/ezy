const path = require('path');

const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { import: true } }],
});

module.exports = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '@api': path.resolve(__dirname, 'src/app/api/index.ts'),
      '@components': path.resolve(__dirname, 'src/app/components/index.ts'),
      '@hooks': path.resolve(__dirname, 'src/app/hooks/index.ts'),
      '@new-storage': path.resolve(__dirname, 'src/app/new-storage/index.ts'),
      '@storage': path.resolve(__dirname, 'src/app/storage/index.ts'),
      '@context': path.resolve(__dirname, './src/app/context/index.ts'),
      '@layouts': path.resolve(__dirname, './src/app/layouts/index.ts'),
      '@core$': path.resolve(__dirname, './src/core/index.ts'),
      '@core/types': path.resolve(__dirname, './src/core/typings.ts'),
      '@database/types': path.resolve(__dirname, './src/main/database/typings.ts'),
    },
  },
};
