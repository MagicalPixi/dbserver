var pluralize = require('pluralize')

module.exports = (kvs, schame) => {
  var express = require('express')
  var router = express.Router()
  kvs.forEach((kv) => {
    var key = kv.key, name = kv.name
    var names = pluralize(name)
    router.post('/' + name, schame[name].save, (req, res, next) => {
      res.json(req.custom[name])
    })
    router.get('/' + names , schame[name].findAll, (req, res, next) => {
      res.json(req.custom.games)
    })
    router.get('/' + name, schame[name].findOne, (req, res, next) => {
      res.json(req.custom.game)
    })
    var path = '/' + name + '/:' + key
    router.get(path, schame[name].findOne, (req, res, next) => {
      res.json(req.custom.game)
    })
  })
  return router
}
