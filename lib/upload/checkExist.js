
module.exports = (req, res, next) => {
  var name = req.body.name || req.query.name
  if (name) {
    var models = require('../models')
    var OpModel = models.OpModels.api.file
    OpModel.findOneCustom({key: name}, (err, result) => {
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
