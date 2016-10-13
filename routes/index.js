var express = require('express');
var router = express.Router()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

var BaseDBRouter = require('../lib/basic').BaseDBRouter
var routes = {}
var redis = require('./redis')

//init db routers
var schames = require('../lib/models').schames

schames.forEach(dbschame => {
  routes[dbschame] = BaseDBRouter(dbschame)
})

routes.index = router
routes.redis = redis

module.exports = routes
