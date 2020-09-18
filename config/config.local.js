
module.exports =  () => {
  const config = {};
    config.proxy = [
    {
      host: 'http://127.0.0.1:7000',
      match: /\/statics/,
    },
  ];
  return config;
};
