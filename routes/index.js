var express = require('express');
var router = express.Router()
var api = require('./api')
var pixi = require('./pixi')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = {
  index: router,
  api: api,
  pixi: pixi
}
