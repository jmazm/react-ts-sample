const { Service } = require('egg');
class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  async sayHi(name) {
    return `hi, ${name}`;
  }
}

module.exports = Test;