var config = require('../config')
var common = require('mp_common')
var statics = common.statics

var checkServerAuth = (req) => {
  if (req.get(statics.server_key)) {
    console.log(common.encode(config.common.server_key))
    return req.get(statics.server_key) == common.encode(config.common.server_key)
  } else {
    return false
  }
}

module.exports = (req, res, next) => {
  if (common.auth.check(req.cookies) || common.auth.check(req.headers) || checkServerAuth(req)) {
    next()
  } else {
    res.json({msg:'auth is invalid', errCode:602})
  }
}
