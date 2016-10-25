
module.exports = (req, res, next) => {
  if (req.files.file.forEach) {
    next()
  } else {
    var config = require('./../../config')
    var qiniu = require('qiniu')
    qiniu.conf.ACCESS_KEY = config.common.qiniu.accessKey
    qiniu.conf.SECRET_KEY = config.common.qiniu.secretKey
    var domain = config.common.qiniu.domain
    var key = req.body.name || req.files.file.originalFilename
    key = req.custom.file ? req.custom.file.version + '/' + key : '0/' + key
    var filePath = req.files.file.path
    var putPolicy = new qiniu.rs.PutPolicy(config.common.qiniu.bucket + ":" + key)
    var token = putPolicy.token()
    var extra = new qiniu.io.PutExtra()
    qiniu.io.putFile(token, key, filePath, extra, function(err, ret) {
      if (ret) {
        req.custom.qiniu = {url: domain + key}
      } else {
        req.custom.qiniuerr = err
      }
      next()
    });
  }
}
