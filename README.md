## dbserver

_The Magical pixi db server_

### install

```bash
npm install
```
### start

```bash
npm start
```
### create db model


###### Add data operation model

add model file at `/lib/db/<schame>/<name>.js` and add code

```javascript
var BaseOpModel = require('../BaseOpModel')
var Connection = require('../Connection')
var Property = require('../Property')
var props = Property({
  ......
})
module.exports = BaseOpModel('<model name>', props, Connection.mobileconnection)
```

###### Add middleware
add middleware file at `/middleware/db/<schame>/<name>.js` and add code

```javascript
var model = require('../../../lib/db')[<name>]
var BaseDBMiddleWare = require('./BaseDBMiddleWare')
module.exports = BaseDBMiddleWare(model, '<name>')
```
