var name = 'user'
var props = {
  name: String,
}

var relations = [
  {
    key: 'games',
    ref: 'game'
  }
]
module.exports = {
  name, props, relations
}
