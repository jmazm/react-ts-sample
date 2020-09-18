const path = require('path');
const {merge} = require('webpack-merge');
const { HashedModuleIdsPlugin } = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const base = require('./webpack.base.config');
const entryObj = require('./entry').getEntries();
const { OUTPUT_DIR, PUBLIC_PATH } = require('./config');

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
    publicPath: PUBLIC_PATH
  },
  devtool: false,
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              hmr: false
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              hmr: false
            }
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.sass$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              hmr: false
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 24,
    }),
     new MiniCssExtractPlugin({
       filename: '[name].[contenthash].css',
       chunkFilename: '[name].[contenthash].css',
       publicPath: PUBLIC_PATH
     })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        echarts: {
          name: 'chunk-echarts',
          test: /[\\/]node_modules[\\/]echarts[\\/]/,
          priority: 20,
        },
        common: {
          test: module => {
            return /react|redux/.test(module.context);
          },
          name: 'chunk-common',
          chunks: 'all',
        },
      }
    },
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin()
    ],
    runtimeChunk: false,
    
  },
})