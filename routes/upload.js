var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var upload = require('../lib/upload')
var cross = require('../lib/cross')

router.post('/', cross, upload.checkExist, multipartMiddleware, upload.qiniu, upload.delete, upload.savedata, (req, res, next) => {
  if (req.custom.qiniu) {
    res.json(req.custom.qiniu)
  } else {
    next(new Error(req.custom.qiniuerr))
  }
})

router.post('/content', cross, upload.checkExist, upload.savefile, upload.qiniu, upload.delete, upload.savedata, (req, res, next) => {
  if (req.custom.qiniu) {
    res.json(req.custom.qiniu)
  } else {
    next(new Error(req.custom.qiniuerr))
  }
})

module.exports = router
