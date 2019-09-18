'use strict'

var assert = require('assert')

var Sicepat = require('../')
var config = require('../config.json')

describe('CANCEL PICKUP', function () {
  this.timeout(30000)

  var sicepat = new Sicepat({
    apikey: config.api.apikey,
    devmode: config.api.devmode
  })
  var receiptNo = '653851825686'

  it('request', function (done) {
    sicepat.cancelPickup(receiptNo, function (err, res) {
      assert.strictEqual(err, null)
      console.log(res)
      done()
    })
  })
})
