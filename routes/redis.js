var redis = require('redis')
var express = require('express')
var router = express.Router()
var client = redis.createClient()

var response = (res, err, result) => {
  if (err) {
    res.json({success: false, err: err, result: result, msg: 'got a error'})
  } else if (result) {
    res.json({success: true, err: err, result: result, msg: 'ok'})
  } else {
    res.json({success: false, err: err, result: result, msg: 'with out value for key'})
  }
}

var get = (req, res, next) => {
  var key = req.params.key || req.query.key
  client.get(key, (err, result) => {
    response(res, err, result)
  })
}

var set = (req, res, next) => {
  var key = req.params.key || req.query.key || req.body.key
  var value = req.body.value || req.query.value
  client.set(key, value, (err, result) => {
    response(res, err, result)
  })
}

router.post('/:key', set)
router.get('/:key', get)

module.exports = router
