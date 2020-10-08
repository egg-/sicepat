'use strict'

const request = require('request')

const DEV_ENDPOINT = 'http://ec2-52-77-81-189.ap-southeast-1.compute.amazonaws.com:8087'
const PRD_ENDPOINT = 'http://pickup.sicepat.com:8082'

/**
 * Client
 * @param {object} opts
 * @param {string} opts.apikey
 * @param {boolean} [opts.devmode]
 */
function Client (opts) {
  this.apikey = opts.apikey
  this.endpoint = opts.devmode ? DEV_ENDPOINT : PRD_ENDPOINT
}

/**
 * request
 * @param {object} param
 * @param {string} param.endpoint
 * @param {string} [param.method] default POST
 * @param {objct} param.data
 */
Client.prototype.request = function (param, cb) {
  param.data.auth_key = this.apikey
  request({
    uri: this.endpoint + param.endpoint,
    method: param.method || 'POST',
    json: true,
    body: param.data
  }, function (err, rep, body) {
    if (err) {
      return cb(err)
    }
    if (body.status !== '200') {
      err = {
        status: Number(body.status) || 500,
        message: body.error_message || body.Message
      }
      return cb(err)
    }
    cb(null, body)
  })
}

module.exports = Client
