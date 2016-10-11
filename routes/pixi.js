var BaseDBRouter = require('./BaseDBRouter')
var common = require('../lib/db').pixi
var sprite = {key: 'sid', name: 'sprite'}
var source = {key: 'sid', name: 'source'}
var greateSprite = {key: 'gsid', name: 'greateSprite'}
kvs = [sprite, source, greateSprite]
module.exports = BaseDBRouter(kvs, common)
