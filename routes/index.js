var express = require('express');
var router = express.Router()
var db = require('../middleware').db
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/game', db.mobile.game.save, (req, res, next) => {
  res.json(req.custom.game)
})

router.get('/games', db.mobile.game.findAll, (req, res, next) => {
  res.json(req.custom.games)
})

//for query
router.get('/game', db.mobile.game.findOne, (req, res, next) => {
  res.json(req.custom.game)
})

//for params
router.get('/game/:gid', db.mobile.game.findOne, (req, res, next) => {
  res.json(req.custom.game)
})

module.exports = router;
