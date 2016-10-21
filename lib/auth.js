const AUTHID = 'authId'
const AUTH = 'auth'
const EXPIRE_TIME = 'expire_time'
const SERVER_KEY = 'server_key'
const KEY = 'admin'

var checkAppAuth = (req) => {
  if (req.get(AUTHID) && req.get(AUTH) && req.get(EXPIRE_TIME)) {
    var encode = require('./utils').encode
    var current = new Date().getTime()
    return encode(req.get(AUTHID) + req.get(EXPIRE_TIME)) == req.get(AUTH) && req.get(EXPIRE_TIME) > current
  } else {
    return false
  }
}

var checkServerAuth = (req) => {
  if (req.get(SERVER_KEY)) {
    var encode = require('./utils').encode
    return req.get(SERVER_KEY) == encode(KEY)
  } else {
    return false
  }
}

module.exports = (req, res, next) => {
  if (checkAppAuth(req) || checkServerAuth(req)) {
    next()
  } else {
    res.json({msg:'auth is invalid', errCode:602})
  }
}
