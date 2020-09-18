const chalk = require('chalk');
const assetHelper = require('./asset');

class AssetOutputPlugin {
  emitHook (compilation, callback) {
    const stats = compilation.getStats().toJson({
      hash: true,
      publicPath: true,
      assets: true,
      chunks: false,
      modules: false,
      source: false,
      errorDetails: false,
      timings: false
    });

    const entries = stats.entrypoints;
    console.log(chalk.blue('------------------------------entries assets start------------------------------'));
    console.log(entries)
    console.log(chalk.blue('------------------------------entries assets end------------------------------'));

    const resultList = entries.assets || [];

   
    console.log(chalk.green('------------------------------entries assets write start------------------------------'));
    try {
      assetHelper.setChunks(resultList).save();
      console.log('resultList', JSON.stringify(resultList));
    } catch(err) {
      console.log(resultList);
      console.log(e);
    }

    console.log(chalk.green('------------------------------entries assets write end------------------------------'));

    callback();
  }

  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.emit.tapAsync('AssetOutputPlugin', this.emitHook)
    } else {
      compiler.plugin('emit', emitHook)
    }
  }
}

module.exports = AssetOutputPlugin;