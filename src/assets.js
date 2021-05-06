let manifest;

try {
  
  manifest = require('../build/assets/manifest.json');
} catch (err) {

}

module.exports = function assetsBuilder(developmentMode) {
  function assetPath(path) {
    return (!developmentMode && manifest && manifest[path]) || `/assets/${path}`;
  }
  return function assets(ctx, next) {
    ctx.state.assetPath = assetPath;
    return next();
  };
};


