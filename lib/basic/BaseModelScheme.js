var fs = require('fs')
var path = require('path')
module.exports = (scheme) => {
  var dir = path.resolve(__dirname, '../models/' + scheme + '/')
  var arr = []
  var jsFileRegExp = /\.js$/
  var files = fs.readdirSync(dir)
  var models = files.filter(file => {
    return jsFileRegExp.test(file) && file != 'index.js'
  }).map(file => {
    return file.replace(jsFileRegExp, '')
  }).forEach(modelname => {
    var model = require('../models/' + scheme + '/' + modelname)
    model.name = model.name || modelname
    model.key = model.key || 'id'
    model.scheme = scheme
    arr.push(model)
  })
  return arr
}
