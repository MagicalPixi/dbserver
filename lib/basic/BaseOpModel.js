var BaseModel = require('./BaseModel')

module.exports = (name, property, connection, relations) => {
  var Model = BaseModel(name, property, connection)
  relations = relations || []
  var findAll = cb => {
    var query = Model.find()
    relations.forEach(relation => {
      query.populate(relation.key)
    })
    query.exec(cb)
  }

  var findOne = (id, cb) => {
    var query = Model.findOne({id: id})
    relations.forEach(relation => {
      query.populate(relation.key)
    })
    query.exec(cb)
  }

  var create = (data, cb) => {
    var result = new Model(data)
    result.id = result._id
    result.save(cb)
  }

  var update = (data, cb) => {
    findOne(data.id, (err, result) => {
      if (result) {
        Object.assign(result, data)
        result.id = result._id
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
