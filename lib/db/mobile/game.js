var BaseOpModel = require('../BaseOpModel')
var Connection = require('../Connection')
var Property = require('../Property')

var props = Property({
  name: String,
  desc: String,
  icon: String,
  auth: Boolean,
  scoreType: Number,
  js: String
})
module.exports = BaseOpModel('game', props, Connection.mobileconnection)
