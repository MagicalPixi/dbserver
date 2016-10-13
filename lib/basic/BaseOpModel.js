var BaseModel = require('./BaseModel')

module.exports = (model, property, connection) => {
  var name = model.name
  var relations = model.relations || []
  var nocopyid = model.nocopyid
  var key = model.key

  var Model = BaseModel(name, property, connection)

  var findAndUpdate = (option, data, cb) => {
    findOneCustom(option, (err, result) => {
      if (err) {
        cb(err)
      } else {
        if (result) {
          Object.assign(result, data)
          result.save(cb)
        } else {
          cb(new Error('query finish with no error and no result'))
        }
      }
    })
  }

  var findMany = (option, cb) => {
    var query = Model.find(option)
    query.exec(cb)
  }

  var findOneCustom = (option, cb) => {
    var query = Model.findOne(option)
    relations.forEach(relation => {
      query.populate(relation.key)
    })
    query.exec(cb)
  }

  var findAll = cb => {
    var query = Model.find()
    // relations.forEach(relation => {
    //   query.populate(relation.key)
    // })
    query.exec(cb)
  }

  var findOne = (id, cb) => {
    var query = Model.findOne({[key]: id})
    relations.forEach(relation => {
      query.populate(relation.key)
    })
    query.exec(cb)
  }

  var create = (data, cb) => {
    var result = new Model(data)
    if (key != 'id') {
      if (data[key]) result._id = data[key]
    } else {
      if (!nocopyid) result.id = result._id
    }
    result.save(cb)
  }

  var update = (data, cb) => {
    findOne(data.id, (err, result) => {
      if (result) {
        Object.assign(result, data)
        if (key != 'id') {
          if (data[key]) result._id = data[key]
        } else {
          if (!nocopyid) result.id = result._id
        }
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
    findAndUpdate, findOneCustom, findMany, findOne, findAll, create, update, createOrUpdate, Model, model
  }
  return OpModel
}
