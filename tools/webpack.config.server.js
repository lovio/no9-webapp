import webpack from 'webpack';
import path from 'path';

import nodeExternals from 'webpack-node-externals';

import config from '../config.json';
import svgoConfig from './svgo-config.json';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

export default {
  resolve: {
    modules: [path.join(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      ui: path.join(__dirname, '../src/ui'),
    },
  },
  entry: ['babel-polyfill', './src/serverRenderMiddleware'],
  target: 'node', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: `${config.STATIC_PREFIX}`,
    filename: 'serverRenderMiddleware.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '../src'),
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(ico|jpe?g|png|gif|woff|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[sha512:hash:base64:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: svgoConfig,
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
    ],
  },
  externals: [nodeExternals()],
  stats: 'minimal',
};
