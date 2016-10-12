module.exports = (req, res, next) => {
  req.custom = req.custom || {}
  next()
}
