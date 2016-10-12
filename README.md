## dbserver

_The Magical pixi db server_

For api doc direct to [here](./README.md#Api)

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

###### Add middleware (Deprecated)
add middleware file at `/middleware/db/<schame>/<name>.js` and add code

```javascript
var model = require('../../../lib/db')[<name>]
var BaseDBMiddleWare = require('./BaseDBMiddleWare')
module.exports = BaseDBMiddleWare(model, '<name>')
```

##### Add Router

_Add new Schame_

add router file at `/router/<name>.js`

_Add Path_

add key value pairs into `/router/<name>.js`
###### example code

```javascript
var BaseDBRouter = require('./BaseDBRouter')
var common = require('../lib/db/common')
var game = {key: 'gid', name: 'game'}
kvs = [game]
module.exports = BaseDBRouter(kvs, common)
```
### TODO

- [x] Add one to many && many to many auto bind

### Api

_the db server api doc_

#### Host

[`http://db.magicalpixi.com/`](http://db.magicalpixi.com/) is for product

[`http://test.db.magicalpixi.com/`](http://test.db.magicalpixi.com/) is for test

#### redis

_Get value for key:_
```javascript
path: '/redis/:key' or '/redis'
method: 'get'
params: req.params.key or req.query.key
```
_Set value for key:_
```javascript
path: '/redis/:key' or '/redis'
method: 'post'
params: req.params.key or req.query.key
body: {value: <value>}
```
_Get model value with id_
```javascript
/**
 * @schame current existed [pixi, api]. pixi is for magicalpixi and api is for common
 * @model the model name for example user, game, sprite
 */
path: '/<schame>/<model>/:id'
method: 'get'
params: req.params.id
```
_Get model all values_
```javascript
/**
 * @schame current existed [pixi, api]. pixi is for magicalpixi and api is for common
 * @models for example users, games, sprites
 */
path: '/<schame>/<models>'
method: 'get'
```
_Update or save value_
```javascript
path: '/<schame>/<model>'
method: 'post'
body: the model object //if the object has id property, the server will make update operation
```
