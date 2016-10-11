var game = require('../../../lib/db').mobile.game
var BaseDBMiddleWare = require('../BaseDBMiddleWare')
module.exports = BaseDBMiddleWare(game, 'game')
