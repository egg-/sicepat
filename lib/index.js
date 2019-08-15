'use strict'

const miscs = require('./miscs')
const Client = require('./client')

function Sicepat (opts) {
  miscs.required(opts, ['apikey'])

  this.apikey = opts.apikey
  this.client = new Client({
    apikey: opts.apikey,
    devmode: opts.devmode
  })
}

Sicepat.prototype.requestPickup = function (param, cb) {
  this.client.requestPickup(param, cb)
}

Sicepat.prototype.cancelPickup = function (param, cb) {
  this.client.cancelPickup(param, cb)
}

Sicepat.Parcel = require('./model/parcel')

module.exports = Sicepat
