var pluralize = require('pluralize')

var handlerResult = (req, next, key, plural) => {
  return (err, result) => {
      if (err) {
        next(err)
      } else {
        if (result) {
          var params = plural ? pluralize(key) : key
          req.custom[params] = result
          next()
        } else{
          next(new Error('query finished with no error and no result'))
        }
      }
  }
}

module.exports = (OpModel, key) => {
  var save = (req, res, next) => {
    var data = req.body
    var id = req.params.id || req.query.id || req.body.id
    data.id = id
    OpModel.createOrUpdate(data, handlerResult(req, next, key))
  }
  var findOne = (req, res, next) => {
    var id = req.params.id || req.query.id || req.body.id
    OpModel.findOne(id, handlerResult(req, next, key))
  }
  var findAll = (req, res, next) => {
    OpModel.findAll(handlerResult(req, next, key, true))
  }
  var BaseDBMiddleWare = {
    save, findOne, findAll
  }
  return BaseDBMiddleWare
}
