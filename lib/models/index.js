var Connection = require('../basic/Connection')
var BaseOpModel = require('../basic/BaseOpModel')
var Property = require('../basic/Property')

var api = require('./api')
var pixi = require('./pixi')

var models = pixi.concat(api)
var OpModels = {}

models.forEach(model => {
  var props = Property(model.props)
  if (model.relations) {
    props = Property.appendRelation(props, model.relations)
  }
  var connection = model.schame == 'pixi' ? Connection.mpconnection : Connection.mobileconnection
  var OpModel = BaseOpModel(model.name, props, connection, model.relations)
  if (!OpModels[model.schame]) OpModels[model.schame] = {}
  OpModels[model.schame][model.name] = OpModel
})
module.exports = {
  pixi, api, models, OpModels
}
