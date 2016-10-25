module.exports = (req, res, next) => {
  var statics = require('mp_common').statics
  var extra = statics.user_id + ', ' + statics.auth_id + ', ' + statics.auth + ', ' + statics.expire_time + ', '
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, " + extra);
  next();
}
