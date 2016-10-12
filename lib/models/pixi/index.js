var path = require('path')
var fs = require('fs')

var obj = {}
var arr = []
var dir = path.resolve(__dirname, './')
var jsFileRegExp = /\.js$/
var files = fs.readdirSync(dir)
var models = files.filter(file => {
  return jsFileRegExp.test(file) && file != 'index.js'
}).map(file => {
  return file.replace(jsFileRegExp, '')
}).forEach(modelname => {
  var model = require('./' + modelname)
  model.schame = 'pixi'
  arr.push(model)
  obj[modelname] = model
})

module.exports = {
  arr, obj
}
