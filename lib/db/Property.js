var shortid = require('shortid')
module.exports = (property) => {
  var props = {}
  Object.assign(props, property)
  props.id = String
  props._id = {
    type: String,
    'default': shortid.generate
  }
  return props
}
