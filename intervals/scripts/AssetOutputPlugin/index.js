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

    const assetsByChunkName = stats.assetsByChunkName;
    console.log(chalk.blue('------------------------------assetsByChunkName start------------------------------'));
    console.log(assetsByChunkName)
    console.log(chalk.blue('------------------------------assetsByChunkName end------------------------------'));

    let resultList = {};

    if (process.env.NODE_ENV === 'development') {
      resultList = assetsByChunkName;
    }


    console.log(chalk.green('------------------------------assetsByChunkName write start------------------------------'));
    try {
      assetHelper.setChunks(resultList).save();
      console.log(JSON.stringify(resultList));
    } catch(err) {
      console.log(resultList);
      console.log(e);
    }

    console.log(chalk.green('------------------------------assetsByChunkName write end------------------------------'));

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