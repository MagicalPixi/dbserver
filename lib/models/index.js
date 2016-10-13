var Connection = require('../basic/Connection')
var BaseOpModel = require('../basic/BaseOpModel')
var Property = require('../basic/Property')
var BaseModelScheme = require('../basic/BaseModelScheme')

//init Models for exports and its property
var Models = {}
var models = []
var schemes = []
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
  var model = BaseModelScheme(file)
  schemes.push(file)
  Models[file] = model
  models = models.concat(model)
})

models.forEach(model => {
  var props = Property(model.props)
  if (model.relations) {
    props = Property.appendRelation(props, model.relations)
  }
  var connection = model.scheme == 'pixi' ? Connection.mpconnection : Connection.mobileconnection
  var OpModel = BaseOpModel(model.name, props, connection, model.relations)
  if (!OpModels[model.scheme]) OpModels[model.scheme] = {}
  OpModels[model.scheme][model.name] = OpModel
})

Models.OpModels = OpModels
Models.models = models
Models.schemes = schemes
module.exports = Models
