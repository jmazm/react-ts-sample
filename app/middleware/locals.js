const path = require('path');
const _ = require('lodash');
const assetPath = path.join(process.cwd(), 'build/statics');

function getAssetData() {
  try {
    return require(path.join(assetPath, 'asset.json'));
  } catch (e) {
    console.warn(e);
    return {};
  }
}

module.exports = options => async (ctx, next) => {
  const {
    env,
  } = ctx.app.config;
  ctx.locals.varies = {
    env,
  };

  //以下是对 asset 的处理，添加 getChunkJS 用户获取 build 生成的 js 文件
  const assetData = getAssetData();
  const chunks = assetData.chunks;
  const chunksMap = {};

  ctx.locals.assets = assetData;

  console.error('&&&&chunks',chunks)

  for (const item in chunks) {
    if (chunks.hasOwnProperty(item)) {
      const jsArr = _.get(chunks, [item, 'js'], []);

      chunksMap[item] = jsArr.map(item => `<script type="text/javascript" src="${ctx.app.config.assetUrl + item}"></script>`).join('');
    }
  }

  console.error('chunksMap', chunksMap)

  ctx.locals.chunksMap = chunksMap;

  // EGG_SERVER_ENV
  ctx.locals.eggServerEnv = process.env.EGG_SERVER_ENV;

  await next();
};
