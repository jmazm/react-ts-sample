const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');

const entryObj = require('./entry').getEntries();

const ROOT = process.cwd();
const DIST_DIR = path.resolve(ROOT, 'dist');




module.exports = merge(base, {
  mode: 'development',
  entry: () => {
    const entries = {};
    for (const entry in entryObj) {
      entries[entry] = [
        // 'webpack-hot-middleware/client?path=http://127.0.0.1:7000/__webpack_hmr',  // ssr才使用
        entryObj[entry].path]
    }

    console.error('&&&&entries====', entries)

    return entries;
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: DIST_DIR
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 7000,
    historyApiFallback: true,
    inline: true,
  }
})