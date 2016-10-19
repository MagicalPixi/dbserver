
var cb = (req, res, next) => {
  return (err, result) => {
    if (err) {
      next(err)
    } else {
      next()
    }
  }
}

module.exports = (req, res, next) => {
  var models = require('../models')
  var OpModel = models.OpModels.api.file
  if (req.custom.file) {
    var file = req.custom.file
    OpModel.update(file, cb(req, res, next))
  } else {
    var file = {key: req.body.name, version: 0}
    OpModel.create(file, cb(req, res, next))
  }
}
