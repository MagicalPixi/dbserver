
module.exports = (req, res, next) => {
  var shortid = require('shortid')
  var fs = require('fs')
  var path = require('path')
  var content = req.body.content
  var name = req.query.name
  var id = shortid.generate()
  var dir = path.resolve(__dirname, '../../files/' + id + '-' + name)
  fs.writeFile(dir, content, err => {
    req.files = req.files || {}
    req.files.file = {
      path: dir,
      originalFilename: name
    }
    next(err)
  })
}
