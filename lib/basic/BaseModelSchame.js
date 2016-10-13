var fs = require('fs')
var path = require('path')
module.exports = (schame) => {
  var dir = path.resolve(__dirname, '../models/' + schame + '/')
  var arr = []
  var jsFileRegExp = /\.js$/
  var files = fs.readdirSync(dir)
  var models = files.filter(file => {
    return jsFileRegExp.test(file) && file != 'index.js'
  }).map(file => {
    return file.replace(jsFileRegExp, '')
  }).forEach(modelname => {
    var model = require('../models/' + schame + '/' + modelname)
    model.schame = schame
    arr.push(model)
  })
  return arr
}
