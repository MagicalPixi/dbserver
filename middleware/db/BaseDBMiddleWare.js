var pluralize = require('pluralize')
module.exports = (OpModel, key) => {
  var save = (req, res, next) => {
    var data = req.body
    var gid = req.params.gid || req.query.gid || req.body.id
    data.id = gid
    OpModel.createOrUpdate(data, (err, result) => {
      if (err) {
        next(err)
      } else {
        if (result) {
          req.custom[key] = result
          next()
        } else{
          next(new Error())
        }
      }
    })
  }

  var findOne = (req, res, next) => {
    var gid = req.params.gid || req.query.gid
    OpModel.findOne(gid, (err, result) => {
      if (err) {
        next(err)
      } else {
        if (result) {
          req.custom[key] = result
          next()
        } else{
          next(new Error())
        }
      }
    })
  }
  var findAll = (req, res, next) => {
    OpModel.findAll((err, result) => {
      if (err) {
        next(err)
      } else {
        if (result) {
          var keys = pluralize(key)
          req.custom[keys] = result
          next()
        } else{
          next(new Error())
        }
      }
    })
  }
  var BaseDBMiddleWare = {
    save, findOne, findAll
  }
  return BaseDBMiddleWare
}
