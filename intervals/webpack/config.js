const path = require('path');
const ROOT = process.cwd();
const OUTPUT_DIR = path.resolve(ROOT, 'build/statics');
const INPUT_DIR = path.resolve(ROOT, 'src');

module.exports = {
  ROOT,
  OUTPUT_DIR,
  INPUT_DIR
}