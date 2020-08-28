const path = require('path');

module.exports =  (appInfo) => {
  const config = {};

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598499931656_9971';

  // add your egg config in here
  config.middleware = ['locals'];

  // add your special config in here
  const bizConfig = {
    assetUrl: `/statics/`
  };

  config.static = {
    prefix: '/statics/',
    dir: path.join(process.cwd(), './build/statics'),
    gzip: true,
  };


  config.view = {
    mapping: {
      '.nj': 'nunjucks',
      '.ejs': 'ejs',
    },
    root: [
      path.join(appInfo.root, 'app/view')
    ].join(',')
  }

  config.proxy = [
    {
      host: 'http://127.0.0.1:7000',
      match: /\/statics/,
    },
  ];


  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
