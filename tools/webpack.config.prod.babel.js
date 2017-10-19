import webpack from 'webpack';
import path from 'path';
import WebpackMd5Hash from 'webpack-md5-hash';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import HappyPack from 'happypack';
import svgoConfig from './svgo-config.json';

import config from '../config.json';

const vendor = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'react-redux',
  'redux-actions',
  'redux-form',
  'redux-immutable',
  'react-router-dom',
  'redux-saga',
  'immutable',
  'reselect',
  'axios',
  'qs',
  'styled-components',
];

export default {
  resolve: {
    modules: [path.join(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      ui: path.join(__dirname, '../src/ui'),
    },
  },
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: {
    app: ['./src/index'],
    vendor,
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: `${config.STATIC_PREFIX}`,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[chunkhash].[id].bundle.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    // new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, '../src/images/logo.jpg'),
    //   },
    // ]),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].[chunkhash:8].js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new AssetsPlugin({
      path: path.join(__dirname, '..'),
      filename: 'assets.json',
      fullPath: false,
    }),
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: ['babel-loader'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '../src'),
        use: ['happypack/loader?id=jsx'],
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
          'svg-react-loader',
          {
            loader: 'svgo-loader',
            options: {
              svgo: svgoConfig,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
    ],
  },
};
