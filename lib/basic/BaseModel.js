var mongoose = require('mongoose')

module.exports = (name, property, connection) => {
  var schema = mongoose.Schema(property)
  var Model = connection.model(name, schema)
  return Model
}
