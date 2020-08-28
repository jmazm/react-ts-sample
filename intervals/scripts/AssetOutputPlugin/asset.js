const fs = require('fs-extra');
const path = require('path');

const outputPath = path.join(process.cwd(), 'build/statics');
const assetJsonPath = path.join(outputPath, 'asset.json');

class Asset {
  constructor () {
    this.initAsset();
    this.asset = require(assetJsonPath);
  }


  initAsset(){
  	try{
			fs.statSync(assetJsonPath)
		}catch(e){
			console.log('asset.json not exists, create one');
			const assetJson = {
				chunks: {}
			}
			this.asset = assetJson;
			this.save();
		}
  }

  parseAsset(asset) {

  }


  setChunks(chunksData) {

   console.error('chunksData', chunksData)
    for (const name in chunksData) {

      const item = chunksData[name];
      let data = [];

      if (typeof item === 'string') {
        data = [item];
      } else {
        data = item;
      }

      this.asset.chunks[name] = {
        js: data
      }
    }

    return this;
  }

  save() {
    try{
      console.log('this.asset', this.asset)
  		fs.writeJsonSync(assetJsonPath, this.asset, 'utf8');
  	}catch(e){
  		throw new Error(`save asset fail:${ e }`);
  	}
  	return this;
  }
}

module.exports = new Asset();