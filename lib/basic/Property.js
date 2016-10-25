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
    if (relation.single) {
      props[relation.key] = {
        type: String,
        ref: relation.ref
      }
    } else {
      props[relation.key] = [{
        type: String,
        'default': shortid.generate,
        ref: relation.ref
      }]
    }
  })
}
module.exports = Property
