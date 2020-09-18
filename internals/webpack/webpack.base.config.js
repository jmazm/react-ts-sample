const path = require('path');
const webpack = require('webpack');
const AssetOutputPlugin = require('../scripts/AssetOutputPlugin');



module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /\.js$/,
        use: [
          "source-map-loader"
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: [
          "source-map-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   use: [{
      //     loader: 'style-loader'
      //   }, {
      //     loader: 'css-loader'
      //   }, {
      //     loader: 'less-loader',
      //     // options: {
      //     //   strictMath: true,
      //     //   // noIeCompat: true
      //     // }
      //   }]
      // },
      // {
      //   test: /\.scss/,
      //   include: /node_modules/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(SOURCE_DIR, 'index.html'),
    //   filename: 'index.html',
    //   inject: true
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new AssetOutputPlugin(),

  ],
  resolve: {
    alias: {
      '@common': path.resolve(process.cwd(), 'client/common'),
      '@modules': path.resolve(process.cwd(), 'client/modules'),
    },
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  target: 'web',
};