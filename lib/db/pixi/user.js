
var BaseOpModel = require('../BaseOpModel')
var Connection = require('../Connection')
var Property = require('../Property')

var props = Property({
  username: String,
  password: String,
  email: String
})
module.exports = BaseOpModel('user', props, Connection.mpconnection)
