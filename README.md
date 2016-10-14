## dbserver

_The Magical pixi db server_

For api doc direct to [here](./README.md#api)

### install

```bash
npm install
```
### start

_for debug:_
```bash
npm start
```
_for test:_
```bash
npm run test
```
_for production_
```bash
npm run production
```

### create db model


###### Add data operation model

add model file at `/lib/models/schame>/<name>.js` and add code
```javascript
var name = 'game'
var props = {
  name: String,
  desc: String,
  icon: String,
  auth: Boolean,
  scoreType: Number,
  js: String
}
var relations = [
  {
    key: 'users',
    ref: 'user'
  }
]

module.exports = {
  props, relations, name
}
```
### TODO

- [x] Add one to many && many to many auto bind
- [x] Delete redundant code
- [x] Optional copy \_id to id
- [x] Use custom model key
- [x] Add custom key for query
- [ ] Add optional mapping relate properties

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

#### normal

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
_Get model value with query_
```javascript
/**
 * @schame current existed [pixi, api]. pixi is for magicalpixi and api is for common
 * @model the model name for example user, game, sprite
 * @query must be the model property
 */
path: '/<schame>/<model>'
method: 'get'
query: key=value
```
_Get model all values_
```javascript
/**
 * @schame current existed [pixi, api]. pixi is for magicalpixi and api is for common
 * @models for example users, games, sprites
 * @query must be the model property
 */
path: '/<schame>/<models>'
method: 'get'
query: key=value
```
_Update or save value_
```javascript
path: '/<schame>/<model>'
method: 'post'
body: the model object //if the object has id property, the server will make update operation
```
_Update value with query_
```javascript
/**
 * @schame current existed [pixi, api]. pixi is for magicalpixi and api is for common
 * @model the model name for example user, game, sprite
 * @query must be the model property
 */
path: '/<schame>/<model>'
method: 'post'
query: key=value
body: the model object //if the object has id property, the server will make update operation
```

_Upload single file with muti-part request, [example](./upload.js)_
```javascript
path: '/upload'
method: 'post'
query: name=<name>
body: muti-part data body with file stream
```

_Upload file content_
```javascript
path: '/upload/content'
method: 'post'
query: name=<name>
body: {content: "<content>"}
```
