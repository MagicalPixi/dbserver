
module.exports = (req, res, next) => {
  var fs = require('fs')
  var files = req.files
  if (files.file) {
    if (files.file.forEach) {
      files.file.forEach((file) => {
        fs.unlinkSync(file.path)
      })
      next(new Error('do not support muti files uplaod currently'))
    } else {
      var file = files.file
      fs.unlinkSync(file.path)
      next()
    }
  } else {
    next(new Error('upload without file'))
  }
}
