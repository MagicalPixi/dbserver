var BaseModel = require('./BaseModel')

var populate = function(relation) {
  if (relation.cross) {
    var OpModels = require('../models').OpModels
    var model = OpModels[relation.cross][relation.ref].Model
    this.populate({path: relation.key, model: model})
  } else {
    this.populate(relation.key)
  }
}

module.exports = (model, property, connection) => {
  var name = model.name
  var relations = model.relations || []
  var nocopyid = model.nocopyid
  var key = model.key

  var Model = BaseModel(name, property, connection)

  var findAndUpdate = (option, fieldsDisplay, data, cb) => {
    findOneCustom(option, fieldsDisplay, (err, result) => {
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

  var findMany = (option, fieldsDisplay, cb) => {
    var query = Model.find(option,fieldsDisplay)
    query.exec(cb)
  }

  var findOneCustom = (option, fieldsDisplay, cb) => {
    var query = Model.findOne(option, fieldsDisplay)
    relations.forEach(relation => {
      populate.call(query, relation)
      // query.populate(relation.key)
    })
    query.exec(cb)
  }

  var findAll = (fieldsDisplay,cb) => {
    var query = Model.find({},fieldsDisplay)
    // relations.forEach(relation => {
    //   query.populate(relation.key)
    // })
    query.exec(cb)
  }

  var findOne = (id, fieldsDisplay, cb) => {
    var query = Model.findOne({[key]: id}, fieldsDisplay)
    relations.forEach(relation => {
      populate.call(query, relation)
      // query.populate(relation.key)
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
