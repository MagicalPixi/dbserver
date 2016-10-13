var props = {
  openid: String,
  token: {
    access_token: String,
    expires_in: Number,
    refresh_token: String,
    openid: String,
    scope: String,
    create_at: Number
  },
  nickname: String,
  sex: String,
  headimgurl: String,
}

var relations = [
  {
    key: 'games',
    ref: 'game'
  }
]

module.exports = {
  key: 'openid',
  props, relations
}
