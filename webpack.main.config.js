/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const rules = require('./webpack.rules');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.join(__dirname, './migrations/dist'), to: 'migrations' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@core$': path.resolve(__dirname, './src/core/index.ts'),
      '@core/types': path.resolve(__dirname, './src/core/typings.ts'),
    },
  },
};
