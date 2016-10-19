var fs = require('fs')
var path = require('path')

var filesDir = path.resolve(__dirname, '../../files/');

if(!fs.existsSync(filesDir)){
  fs.mkdir(filesDir);
}

module.exports = (req, res, next) => {
  var shortid = require('shortid')
  var content = req.body.content
  var name = req.body.name
  var id = shortid.generate();
  var dir = path.join(filesDir, id + '-' + name)

  fs.writeFile(dir, content, err => {
    req.files = req.files || {}
    req.files.file = {
      path: dir,
      originalFilename: name
    }
    next(err)
  })
}
