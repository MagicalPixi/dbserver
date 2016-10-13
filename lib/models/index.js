var Connection = require('../basic/Connection')
var BaseOpModel = require('../basic/BaseOpModel')
var Property = require('../basic/Property')
var BaseModelSchame = require('../basic/BaseModelSchame')

//init Models for exports and its property
var Models = {}
var models = []
var schames = []
var OpModels = {}

var path = require('path')
var fs = require('fs')
var dir = path.resolve(__dirname, './')
var jsFileRegExp = /\.js$/
var files = fs.readdirSync(dir)
files.filter(file => {
  var current = dir + '/' + file
  return fs.lstatSync(current).isDirectory()
}).forEach(file => {
  var model = BaseModelSchame(file)
  schames.push(file)
  Models[file] = model
  models = models.concat(model)
})

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

Models.OpModels = OpModels
Models.models = models
Models.schames = schames
module.exports = Models
