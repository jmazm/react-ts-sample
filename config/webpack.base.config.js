const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = process.cwd();
const DIST_DIR = path.resolve(ROOT, 'dist');
const SOURCE_DIR = path.resolve(ROOT, 'src');

console.error(SOURCE_DIR)


module.exports = {
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          // options: {
          //   strictMath: true,
          //   // noIeCompat: true
          // }
        }]
      },
      {
        test: /\.scss/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_DIR, 'index.html'),
      filename: 'index.html',
      inject: true
    })
  ],
  resolve: {
    alias: {
      '@': SOURCE_DIR,
      '@common': path.resolve(process.cwd(), 'client/common'),
      '@modules': path.resolve(process.cwd(), 'client/modules'),
    },
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  target: 'web',
};