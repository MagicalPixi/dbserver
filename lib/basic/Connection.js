var config = require('../../config')
var dburl = config.common.db
var mongoose = require('mongoose')
var magicalpixiUrl = dburl + config.dbserver.db.pixi
var mpconnection = mongoose.createConnection(magicalpixiUrl)
var mobileUrl = dburl + config.dbserver.db.api
console.log(magicalpixiUrl, mobileUrl)
var mobileconnection = mongoose.createConnection(mobileUrl)
module.exports = {
  mpconnection, mobileconnection
}
