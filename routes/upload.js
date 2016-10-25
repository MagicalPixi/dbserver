var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var upload = require('../lib/upload')

router.post('/', upload.checkExist, multipartMiddleware, upload.qiniu, upload.delete, upload.savedata, (req, res, next) => {
  if (req.custom.qiniu) {
    res.json(req.custom.qiniu)
  } else {
    next(new Error(req.custom.qiniuerr))
  }
})

router.post('/content', upload.checkExist, upload.savefile, upload.qiniu, upload.delete, upload.savedata, (req, res, next) => {
  if (req.custom.qiniu) {
    res.json(req.custom.qiniu)
  } else {
    next(new Error(req.custom.qiniuerr))
  }
})

module.exports = router
