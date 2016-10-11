var pluralize = require('pluralize')
var BaseDBMiddleWare = require('../middleware/db//BaseDBMiddleWare')

module.exports = (kvs, schame) => {
  var express = require('express')
  var router = express.Router()
  kvs.forEach((kv) => {
    var key = kv.key, name = kv.name
    var names = pluralize(name)
    var middleware = BaseDBMiddleWare(schame[name], name, key)
    router.post('/' + name, middleware.save, (req, res, next) => {
      res.json(req.custom[name])
    })
    router.get('/' + names , middleware.findAll, (req, res, next) => {
      res.json(req.custom[names])
    })
    router.get('/' + name, middleware.findOne, (req, res, next) => {
      res.json(req.custom[name])
    })
    var path = '/' + name + '/:' + key
    router.get(path, middleware.findOne, (req, res, next) => {
      res.json(req.custom[name])
    })
  })
  return router
}
