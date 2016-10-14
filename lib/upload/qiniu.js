
module.exports = (req, res, next) => {
  if (req.files.file.forEach) {
    next()
  } else {
    var config = require('./../../config')
    var qiniu = require('qiniu')
    qiniu.conf.ACCESS_KEY = config.qiniu.accessKey
    qiniu.conf.SECRET_KEY = config.qiniu.secretKey
    var domin = config.qiniu.domin
    var key = req.files.file.originalFilename
    var filePath = req.files.file.path
    var putPolicy = new qiniu.rs.PutPolicy(config.qiniu.bucket + ":" + key)
    var token = putPolicy.token()
    var extra = new qiniu.io.PutExtra()
    qiniu.io.putFile(token, key, filePath, extra, function(err, ret) {
      if (ret) {
        req.custom.qiniu = {url: domin + key}
      } else {
        req.custom.qiniuerr = err
      }
      next()
    });
  }
}
