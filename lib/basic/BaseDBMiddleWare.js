var pluralize = require('pluralize')

var handlerResult = (req, next, key, plural) => {
    return (err, result) => {
        if (err) {
            next(err)
        } else {
            result = result || {}
            var params = plural ? pluralize(key) : key
            req.custom[params] = result
            next()
        }
    }
}

var getFieldDisplayObj = (req, keys) => {
    var dismissFields = req.query.dismissFields;
    var displayFields = req.query.displayFields;
    var result = {};

    if (displayFields) {
        if (displayFields.indexOf(',') != -1) {
            displayFields.split(',').forEach(property => {
                result[property] = 1;
            })
        } else {
            result[displayFields] = 1;
        }
    }else {
        if (dismissFields) {
            if (dismissFields.indexOf(',') != -1) {
                dismissFields.split(',').forEach(property => {
                    result[property] = 0;
                })
            } else {
                result[dismissFields] = 0;
            }
        }
    }
    removeByValue(keys, 'dismissFields');
    removeByValue(keys, 'displayFields');
    console.log("result =>" );
    console.log(result);
    return result;
}

function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

module.exports = (OpModel, key) => {
    var isRelations = (property) => {
        var isR = false
        console.log("property =>" + property);
        OpModel.model.relations.map(relation => {
            isR = isR || relation.key == property
        })
        return isR
    }
    var isProperty = (property) => {
        return property == 'id' || property == '_id' || OpModel.model.props[property] || isRelations(property)
    }

    var findOneCustom = (req, res, next) => {
        var opt = {}
        var query = req.query || {}
        var keys = Object.keys(query)
        var fieldsDisplay = getFieldDisplayObj(req, keys);
        keys.forEach(property => {
            if (isProperty(property)) {
                opt[property] = query[property]
            }
        })
        OpModel.findOneCustom(opt, fieldsDisplay, handlerResult(req, next, key))
    }

    var findMany = (req, res, next) => {
        var query = req.query || {}
        var keys = Object.keys(query)
        var fieldsDisplay = getFieldDisplayObj(req, keys);
        var opt = {}
        if (keys.length > 0) {
            keys.forEach(property => {
                if (isProperty(property)) {
                    opt[property] = query[property]
                }
            })
            OpModel.findMany(opt,fieldsDisplay, handlerResult(req, next, key, true))
        } else {
            findAll(fieldsDisplay, req, res, next)
        }
    }

    var save = (req, res, next) => {
        var data = req.body
        var id = req.params.id || req.body.id
        var query = req.query || {}
        var keys = Object.keys(query)
        if (id || keys.length < 1) {
            data.id = id
            OpModel.createOrUpdate(data, handlerResult(req, next, key))
        } else {
            findAndUpdate(req, res, next, keys, data)
        }
    }

    var findAndUpdate = (req, res, next, keys, data) => {
        var opt = {}
        var query = req.query || {}
        var fieldsDisplay = getFieldDisplayObj(req, keys);
        keys.forEach(property => {
            if (isProperty(property)) {
                opt[property] = query[property]
            }
        })
        console.log(opt)
        OpModel.findAndUpdate(opt, fieldsDisplay, data, handlerResult(req, next, key))
    }

    var findOne = (req, res, next) => {
        var query = req.query || {}
        var keys = Object.keys(query)
        var id = req.params.id || req.body.id
        var fieldsDisplay = getFieldDisplayObj(req, keys);
        if (id) {
            OpModel.findOne(id, fieldsDisplay, handlerResult(req, next, key))
        } else {
            findOneCustom(req, res, next)
        }
    }

    var findAll = (fieldsDisplay, req, res, next) => {
        OpModel.findAll(fieldsDisplay, handlerResult(req, next, key, true))
    }
    var BaseDBMiddleWare = {
        save, findOne, findAll, findOneCustom, findMany
    }
    return BaseDBMiddleWare
}
