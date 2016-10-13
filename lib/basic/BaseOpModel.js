var BaseModel = require('./BaseModel')

module.exports = (model, property, connection) => {
  var name = model.name
  var relations = model.relations || []
  var nocopyid = model.nocopyid

  var Model = BaseModel(name, property, connection)

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
    if (!nocopyid) result.id = result._id
    result.save(cb)
  }

  var update = (data, cb) => {
    findOne(data.id, (err, result) => {
      if (result) {
        Object.assign(result, data)
        if (!nocopyid) result.id = result._id
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
