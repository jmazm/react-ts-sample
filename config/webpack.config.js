const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = process.cwd();
const DIST_DIR = path.resolve(ROOT, 'dist');
const SOURCE_DIR = path.resolve(ROOT, 'src');

module.exports = {
  entry: path.resolve(SOURCE_DIR, 'index.tsx'),
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
          options: {
            strictMath: true,
            noIeCompat: true
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SOURCE_DIR, 'index.html'),
      filename: 'index.html',
      inject: true
    })
  ],
  devServer: {
    port: 7000,
    historyApiFallback: true,
    inline: true,
  }
};