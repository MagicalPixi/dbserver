var express = require('express');
var router = express.Router()
var db = require('../middleware').db
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/games', db.game.findAll, (req, res, next) => {
  res.json(req.custom.games)
})

module.exports = router;
