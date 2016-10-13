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

  var isProperty = (property) => {
    return property == 'id' || property == '_id' || OpModel.model.props[property]
  }

  var findOneCustom = (req, res, next) => {
    var opt = {}
    var query = req.query || {}
    var keys = Object.keys(query)
    keys.forEach(property => {
      if (isProperty(property)) {
        opt[property] = query[property]
      }
    })
    OpModel.findOneCustom(opt, handlerResult(req, next, key))
  }

  var findMany = (req, res, next) => {
    var query = req.query || {}
    var keys = Object.keys(query)
    if (keys.length > 0) {
      var opt = {}
      keys.forEach(property => {
        if (isProperty(property)) {
          opt[property] = query[property]
        }
      })
      OpModel.findMany(opt, handlerResult(req, next, key, true))
    } else {
      findAll(req, res, next)
    }
  }

  var save = (req, res, next) => {
    var data = req.body
    var id = req.params.id || req.query.id || req.body.id
    data.id = id
    OpModel.createOrUpdate(data, handlerResult(req, next, key))
  }

  var findOne = (req, res, next) => {
    var query = req.query || {}
    var keys = Object.keys(query)
    var id = req.params.id || req.body.id
    if (id) {
      OpModel.findOne(id, handlerResult(req, next, key))
    } else {
      findOneCustom(req, res, next)
    }
  }

  var findAll = (req, res, next) => {
    OpModel.findAll(handlerResult(req, next, key, true))
  }
  var BaseDBMiddleWare = {
    save, findOne, findAll, findOneCustom, findMany
  }
  return BaseDBMiddleWare
}
