var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var upload = require('../lib/upload')

router.post('/', multipartMiddleware, upload.qiniu, upload.delete, function(req, res, next) {
  if (req.custom.qiniu) {
    res.json(req.custom.qiniu)
  } else {
    next(new Error(req.custom.qiniuerr))
  }
})

module.exports = router
