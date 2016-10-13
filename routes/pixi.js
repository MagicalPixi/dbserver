var BaseDBRouter = require('../lib/basic').BaseDBRouter
var models = require('../lib/models').pixi
module.exports = BaseDBRouter(models)
