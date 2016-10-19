var name = 'game'
var props = {
  name: String,
  desc: String,
  icon: String,
  auth: Boolean,
  scoreType: Number,
  js: String
}
var relations = [
  {
    key: 'users',
    ref: 'user'
  },
  {
    key: 'owner',
    ref: 'user',
    single: true
  }
]

module.exports = {
  props, relations, name
}
