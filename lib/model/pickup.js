'use strict'

const miscs = require('../miscs')

const REQUIRED = [
  'name', 'phone', 'email', 'date', 'address', 'city'
]

/**
 * Pickup Data
 * @param {object} param pickup
 * @param {string} param.name merchant name
 * @param {string} param.phone merchant phone
 * @param {string} param.email merchant email
 * @param {string} param.date requested pickup time
 * @param {string} param.address pickup address
 * @param {string} param.city pickup city
 */
function Pickup (param) {
  miscs.required(param, REQUIRED)

  for (var i in REQUIRED) {
    this[REQUIRED[i]] = param[REQUIRED[i]]
  }
}

module.exports = Pickup
