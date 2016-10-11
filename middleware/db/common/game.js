var game = require('../../../lib/db').common.game
var BaseDBMiddleWare = require('../BaseDBMiddleWare')
module.exports = BaseDBMiddleWare(game, 'game')
