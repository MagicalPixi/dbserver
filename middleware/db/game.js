var game = require('../../lib/db').game
var BaseDBMiddleWare = require('./BaseDBMiddleWare')
module.exports = BaseDBMiddleWare(game, 'game')
