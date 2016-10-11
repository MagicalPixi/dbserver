var BaseModel = require('./BaseModel')

module.exports = (name, property, connection) => {
  var Model = BaseModel(name, property, connection)

  var findAll = cb => Model.find(cb)
  var findOne = (id, cb) => {
    var query = Model.where({id: id})
    query.findOne(cb)
  }

  var create = (data, cb) => {
    var result = new Model(data)
    data.id = data._id
    result.save(cb)
  }

  var update = (data, cb) => {
    findOne(data.id, (err, result) => {
      if (result) {
        Object.assign(result, data)
        result.save(cb)
      } else {
        create(data, cb)
      }
    })
  }

  var createOrUpdate = (data, cb) => {
    if (data.id) {
      update(data, cb)
    } else {
      create(data, cb)
    }
  }
  var OpModel = {
    findOne, findAll, create, update, createOrUpdate, Model
  }
  return OpModel
}
