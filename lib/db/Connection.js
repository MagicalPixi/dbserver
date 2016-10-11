var dburl = require('../../config').dburl
var mongoose = require('mongoose')
var magicalpixiUrl = dburl + 'MagicalPixi'
var mpconnection = mongoose.createConnection(magicalpixiUrl)
var mobileUrl = dburl + 'mobile'
var mobileconnection = mongoose.createConnection(mobileUrl)
module.exports = {
  mpconnection, mobileconnection
}
