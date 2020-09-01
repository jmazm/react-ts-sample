const path = require('path');
const {merge} = require('webpack-merge');
const { HashedModuleIdsPlugin } = require('webpack');


const base = require('./webpack.base.config');
const entryObj = require('./entry').getEntries();
const { OUTPUT_DIR } = require('./config');

module.exports = merge(base, {
  mode: 'production',
  entry: () => {
    const entries = {};

    for (const entry in entryObj) {
      entries[entry] = entryObj[entry].path
    }

    console.error('==entries', entries)

    return entries;
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    path: OUTPUT_DIR,
    publicPath: '/'
  },
  devtool: false,
  
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 24,
    })
  ]
})