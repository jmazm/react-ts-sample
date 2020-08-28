const plugin = {
  static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  view: {
    enable: true,
    package: 'egg-view',
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  proxy: {
    enable: true,
    package: 'egg-proxy',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};

module.exports = plugin;
