
/**
_id:"57bd1d6a9d86256a64d6519d"
actionFrames:null
directory:"跑酷"
id:"57bd1d6a9d86256a64d6519d"
name:"car"
properties:"{"spriteName":"car","animationSpeed":"0.6","loop":true,"play":true}"
resourceUrl:"/basic/_1472011570296_15.json"
type:"mc"
userFlag :"admin"
**/

var BaseOpModel = require('../BaseOpModel')
var Connection = require('../Connection')
var Property = require('../Property')
var props = Property({
  actionFrames: String,
  directory: String,
  name: String,
  properties: String,
  resourceUrl: String,
  type: String,
  userFlag: String
})
module.exports = BaseOpModel('sprite', props, Connection.mpconnection)

/**
_id: "579de7f0ad615a27728f0b94"
actionFrames: "[1,6]"
childSprites: "[{"basic":{"type":"im","name":"骷髅","resourceName":"/basic/_1469965176137_1","resourceUrl":"/basic/_1469965176137_1.png","originImgUrls":[{"url":"/materials/admin/1469720575312skeleton_atk_0.png","resize":1}],"_id":"579de378ad615a27728f0b92"},"properties":{}},{"basic":{"type":"mc","name":"骷髅死","resourceName":"/basic/_1469965216900_2","resourceUrl":"/basic/_1469965216900_2.json","originImgUrls":[{"url":"/materials/admin/1469720575313skeleton_death_0.png","resize":1},{"url":"/materials/admin/1469720575314skeleton_death_1.png","resize":1},{"url":"/materials/admin/1469720575315skeleton_death_2.png","resize":1},{"url":"/materials/admin/1469720575316skeleton_death_3.png","resize":1}],"_id":"579de3a0ad615a27728f0b93"},"properties":{}}]"
name: "骷髅"
resourceName: "/basic/_1469966320446_3"
resourceUrl: "/basic/_1469966320446_3.json"
type: "sp"
**/
