var BaseDBRouter = require('./BaseDBRouter')
var common = require('../lib/db').pixi
var sprite = {key: 'sid', name: 'sprite'}
var source = {key: 'sid', name: 'source'}
var greateSprite = {key: 'gsid', name: 'greateSprite'}
var user = {key: 'uid', name: 'user'}
kvs = [sprite, source, greateSprite, user]
module.exports = BaseDBRouter(kvs, common)
