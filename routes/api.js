var BaseDBRouter = require('../lib/basic').BaseDBRouter
var models = require('../lib/models').api
module.exports = BaseDBRouter(models)
