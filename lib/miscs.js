'use strict'

module.exports = {
  required: function (param, names) {
    for (var i = 0; i < names.length; i++) {
      if (names[i].indexOf('.') !== -1) {
        var keys = names[i].split('.')
        if (typeof param[keys[0]][keys[1]] === 'undefined') {
          throw Error(names[i] + ' is required.')
        }
      } else if (typeof param[names[i]] === 'undefined') {
        throw Error(names[i] + ' is required.')
      }
    }

    return true
  }
}
