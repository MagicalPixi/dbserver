var BaseOpModel = require('../BaseOpModel')
var Connection = require('../Connection')
var Property = require('../Property')

var props = Property({
  name: String,
})

var relations = [
  {
    key: 'games',
    ref: 'game'
  }
]

Property.appendRelation(props, relations)

module.exports = BaseOpModel('user', props, Connection.mobileconnection, relations)
