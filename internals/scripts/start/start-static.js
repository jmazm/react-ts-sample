const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const PORT = 7000;

const webpackConfig = require(path.join(process.cwd(), './internals/webpack/index.js'));

const express = require('express');

const app = express();
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    port: 7000,
    hot: true,
    historyApiFallback: true,
    inline: true,
    proxy: {
      '/': {
        target: 'http://localhost:7001/',
        secure: false,
      },
    },
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    // },
    contentBase: './client/',
    publicPath: '/statics/',
    disableHostCheck: true,
    overlay: { errors: true },
  })
)

app.use(
	webpackHotMiddleware(compiler, {
		reload: true,
		path: '/__webpack_hmr'
	})
);

app.listen(PORT, () => {
  console.log(chalk.green(`App listening to port: ${PORT}`))
})