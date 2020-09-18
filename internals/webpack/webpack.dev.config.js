const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');

const entryObj = require('./entry').getEntries();

const { OUTPUT_DIR, PUBLIC_PATH } = require('./config');



module.exports = merge(base, {
  mode: 'development',
  entry: () => {
    const entries = {};
    for (const entry in entryObj) {
      entries[entry] = [
        'webpack-hot-middleware/client?path=http://127.0.0.1:7000/__webpack_hmr',  // ssr才使用
        entryObj[entry].path]
    }

    console.error('&&&&entries====', entries)

    return entries;
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: OUTPUT_DIR,
    publicPath: PUBLIC_PATH,
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  // devServer: {
  //   port: 7000,
  //   hot: true,
  //   historyApiFallback: true,
  //   inline: true,
  //   proxy: {
  //     '/': {
  //       target: 'http://localhost:7001/',
  //       secure: false,
  //     },
  //   },
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  //     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  //   },
  //   contentBase: './client/',
  //   publicPath: '/statics/',
  //   disableHostCheck: true,
  //   overlay: { errors: true },
  // }
})