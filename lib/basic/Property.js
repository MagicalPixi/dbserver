var shortid = require('shortid')
var mongoose = require('mongoose')
var Property = (model) => {
  var props = {}
  Object.assign(props, model.props)
  if (!model.nocopyid && model.key == 'id') props.id = String
  props._id = {
    type: String,
    'default': shortid.generate
  }
  return props
}

Property.appendRelation = (props, relations) => {
  relations.forEach(relation => {
    props[relation.key] = [{
      // type: mongoose.Schema.ObjectId,
      type: String,
      'default': shortid.generate,
      ref: relation.ref
    }]
  })
}
module.exports = Property
