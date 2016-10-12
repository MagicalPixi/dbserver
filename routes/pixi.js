var BaseDBRouter = require('../lib/basic').BaseDBRouter
var models = require('../lib/models').pixi.arr
module.exports = BaseDBRouter(models)
