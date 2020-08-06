const path = require('path');
const {merge} = require('webpack-merge');
const base = require('./webpack.base.config');

const entryObj = require('./entry').getEntries();

const ROOT = process.cwd();
const DIST_DIR = path.resolve(ROOT, 'dist');

module.exports = merge(base, {
  mode: 'production',
  entry: () => {
    const entries = {};
    for (const entry in entryObj) {
      entries[key] = ['webpack-hot-middleware/client?path=http://127.0.0.1:7000/__webpack_hmr', entryObj[entry].path]
    }

    return entries;
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
})