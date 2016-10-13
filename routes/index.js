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
var schemes = require('../lib/models').schemes

schemes.forEach(dbscheme => {
  routes[dbscheme] = BaseDBRouter(dbscheme)
})

routes.index = router
routes.redis = redis

module.exports = routes
