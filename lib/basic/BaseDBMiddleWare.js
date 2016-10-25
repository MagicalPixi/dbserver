var pluralize = require('pluralize')

var handlerResult = (req, next, key, plural) => {
  return (err, result) => {
      if (err) {
        next(err)
      } else {
        result = result || {}
        var params = plural ? pluralize(key) : key
        req.custom[params] = result
        next()
      }
  }
}

module.exports = (OpModel, key) => {
  var isRelations = (property) => {
    var isR = false
    OpModel.model.relations.map(relation => {
      isR = isR || relation.key == property
    })
    return isR
  }
  var isProperty = (property) => {
    return property == 'id' || property == '_id' || OpModel.model.props[property] || isRelations(property)
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
    var id = req.params.id || req.body.id
    var query = req.query || {}
    var keys = Object.keys(query)
    if (id || keys.length < 1) {
      data.id = id
      OpModel.createOrUpdate(data, handlerResult(req, next, key))
    } else {
      findAndUpdate(req, res, next, keys, data)
    }
  }

  var findAndUpdate = (req, res, next, keys, data) => {
    var opt = {}
    var query = req.query || {}
    keys.forEach(property => {
      if (isProperty(property)) {
        opt[property] = query[property]
      }
    })
    console.log(opt)
    OpModel.findAndUpdate(opt, data, handlerResult(req, next, key))
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
