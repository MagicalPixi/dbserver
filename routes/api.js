var BaseDBRouter = require('./BaseDBRouter')
var common = require('../lib/db').common
var game = {key: 'gid', name: 'game'}
kvs = [game]
module.exports = BaseDBRouter(kvs, common)
