var props = {
  title: String,
  publisher: {
    nickname: String,
    avatar: String,
    status: String
  },
  content: {
    images:[String],
    text: String
  },
  comments: [{
    user: {
      nickname: String,
      avatar: String,
      status: String
    },
    text: String
  }]
}

module.exports = {
  props
}
