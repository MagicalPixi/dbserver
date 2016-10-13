var pluralize = require('pluralize')
var BaseDBMiddleWare = require('./BaseDBMiddleWare')
var OpModels = require('../models').OpModels
module.exports = (scheme) => {
  var express = require('express')
  var router = express.Router()
  var models = require('../models')[scheme]
  models.forEach((model) => {
    var name = model.name
    var names = pluralize(name)
    var middleware = BaseDBMiddleWare(OpModels[model.scheme][name], name)
    router.post('/' + name, middleware.save, (req, res, next) => {
      res.json(req.custom[name])
    })
    router.get('/' + names , middleware.findAll, (req, res, next) => {
      res.json(req.custom[names])
    })
    router.get('/' + name, middleware.findOne, (req, res, next) => {
      res.json(req.custom[name])
    })
    var path = '/' + name + '/:id'
    router.get(path, middleware.findOne, (req, res, next) => {
      res.json(req.custom[name])
    })
  })
  return router
}
