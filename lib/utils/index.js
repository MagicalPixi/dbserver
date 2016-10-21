var path = require('path')
var fs = require('fs')

var utils = {}
var dir = path.resolve(__dirname, './')
var jsFileRegExp = /\.js$/
var files = fs.readdirSync(dir)
var models = files.filter(file => {
  return jsFileRegExp.test(file) && file != 'index.js'
}).map(file => {
  return file.replace(jsFileRegExp, '')
}).forEach(model => {
  var currentmodel = require('./' + model)
  utils[model] = currentmodel
})

module.exports = utils
