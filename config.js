var env = process.env.NODE_ENV
var dburl = env == 'production' ? 'mongodb://localhost/' : 'mongodb://localhost/'
var qiniu = {
  accessKey: "EyEwm6Bjadr4ojSFxpKWt6k-PoyT99D5l_qMCEaL",
  secretKey: "xOUHlBygVg_dIxPcgWmEVu7GG5jl_XVQ57mrV7o0",
  bucket: 'magicalpixi',
  domin: 'http://qiniu.magicalpixi.com/'
}
module.exports = {
  dburl, qiniu
}
