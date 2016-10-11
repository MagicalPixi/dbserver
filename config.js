var env = process.env.NODE_ENV
var dburl = env == 'production' ? 'mongodb://localhost/' : 'mongodb://localhost/'
module.exports = {
  dburl
}
