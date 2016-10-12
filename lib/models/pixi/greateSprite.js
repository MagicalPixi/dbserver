
/**
_id: "579de7f0ad615a27728f0b94"
actionFrames: "[1,6]"
childSprites: "[{"basic":{"type":"im","name":"骷髅","resourceName":"/basic/_1469965176137_1","resourceUrl":"/basic/_1469965176137_1.png","originImgUrls":[{"url":"/materials/admin/1469720575312skeleton_atk_0.png","resize":1}],"_id":"579de378ad615a27728f0b92"},"properties":{}},{"basic":{"type":"mc","name":"骷髅死","resourceName":"/basic/_1469965216900_2","resourceUrl":"/basic/_1469965216900_2.json","originImgUrls":[{"url":"/materials/admin/1469720575313skeleton_death_0.png","resize":1},{"url":"/materials/admin/1469720575314skeleton_death_1.png","resize":1},{"url":"/materials/admin/1469720575315skeleton_death_2.png","resize":1},{"url":"/materials/admin/1469720575316skeleton_death_3.png","resize":1}],"_id":"579de3a0ad615a27728f0b93"},"properties":{}}]"
name: "骷髅"
resourceName: "/basic/_1469966320446_3"
resourceUrl: "/basic/_1469966320446_3.json"
type: "sp"
**/
var name = 'greateSprite'
var props = {
  actionFrames: String,
  childSprites: String,
  name: String,
  resourceName: String,
  resourceUrl: String,
  type: String
}
module.exports = {
  name, props
}
