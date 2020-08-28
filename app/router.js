
module.exports = (app) => {
  const { controller, router } = app;
  router.get('/charts', controller.home.index);
};
