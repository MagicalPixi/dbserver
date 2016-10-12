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
var relation = [
  {
    key: 'users',
    ref: 'user'
  }
]
Property.appendRelation(props, relation)

module.exports = BaseOpModel('game', props, Connection.mobileconnection, relation)
