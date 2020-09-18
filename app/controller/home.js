const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    try {
      await this.ctx.render('home.ejs', { title: 'view test', chunks: ['charts'] });

    } catch (err) {
      console.error('error', err)
    }
  }
}

module.exports = HomeController;