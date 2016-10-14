
module.exports = (req, res, next) => {
  var name = req.query.name
  if (req.query.name) {
    var models = require('../models')
    var OpModel = models.OpModels.api.files
    OpModel.findOneCustom({key: req.query.name}, (err, result) => {
      if (err) {
        next(err)
      } else {
        if (result) {
          result.version ++
          req.custom.file = result
        }
        next()
      }
    })
  } else {
    next(new Error('without file name'))
  }
}
