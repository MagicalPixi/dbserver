module.exports = (text) => {
  var key = 'magical_pixi_'
  var crypto = require('crypto');
  return crypto.createHash('md5').update(text + key).digest('hex');
}
