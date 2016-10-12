var BaseDBRouter = require('../lib/basic').BaseDBRouter
var models = require('../lib/models').api.arr
module.exports = BaseDBRouter(models)
