const fs = require('fs');
const path = require('path');

// 读取目录
const webpackConfigs = fs.readdirSync(path.join(process.cwd(), './internals/webpack'));
const defaultConfig = 'development';

const configMap = {
  development: 'dev',
  test: 'test',
  production: 'pro'
}

const webpackConfigName = `webpack.${configMap[process.env.NODE_ENV || defaultConfig]}.config.js`

let webpackConfig;

if (webpackConfigs.indexOf(webpackConfigName) !== -1) {
  webpackConfig = require(path.join(process.cwd(), `/internals/webpack/${webpackConfigName}`));
} else {
  throw new Error('can not find webpack config');
}

module.exports = webpackConfig;



