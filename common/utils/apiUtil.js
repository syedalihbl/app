const KEY_TIME_OUT = "Error: connect"

isUndefined = function (o) {
    return o === undefined || o === 'undefined';
}

isNull = function (o) {
    return o === null || o === 'null';
}

isNotNull = function (o) {
    return !isNull(o);
}

isEmpty = function (o) {
    typeof o === 'string' && o.trim() === ''
}

isNotNullNorEmpty = function (o) {
    return !isNull(o) && !isEmpty(o)
}

isConnectionTimeOut = function (errObject) {
    console.log(errObject, 'errorObject')
    if (errObject && errObject.indexOf(KEY_TIME_OUT) > -1) {
        return true
    } else {
        return false
    }
}

replaceValidationMessage = function (vo) {
    if (vo && vo.error &&
        vo.error.details.length > 0 &&
        vo.error.details[0].message) {
        vo.error.details[0].message = vo.error.details[0].message.replace(/"/g, "'")
    }
}

getDateTimeArray = function () {
    let date = null
    date = new Date()
    date = date.toJSON()
    date = date.replace(/-/g, '')
    date = date.replace(/:/g, '')
    date = date.substring(0, date.length - 5)
    date = date.split("T")

    return date
}

module.exports = {
    isUndefined,
    isNull,
    isNotNull,
    isEmpty,
    isNotNullNorEmpty,
    isConnectionTimeOut,
    replaceValidationMessage,
    getDateTimeArray
}