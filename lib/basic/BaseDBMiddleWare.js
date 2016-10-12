var pluralize = require('pluralize')
module.exports = (OpModel, key) => {
  var save = (req, res, next) => {
    var data = req.body
    var id = req.params.id || req.query.id || req.body.id
    data.id = id
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
    var id = req.params.id || req.query.id || req.body.id
    OpModel.findOne(id, (err, result) => {
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
