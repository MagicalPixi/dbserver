var BaseDBRouter = require('./BaseDBRouter')
var common = require('../lib/db').common
var game = {key: 'gid', name: 'game'}
var user = {key: 'uid', name: 'user'}
kvs = [game, user]
module.exports = BaseDBRouter(kvs, common)
