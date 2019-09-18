/* globals it describe */

'use strict'

var assert = require('assert')

var Sicepat = require('../')
var config = require('../config.json')

describe('REQUEST PICKUP', function () {
  var sicepat = new Sicepat({
    apikey: config.api.apikey,
    devmode: config.api.devmode
  })
  var referenceNo = 'TEST-REFERENCE_NO'
  var receiptNo = '653851825686'

  var pickup = new Sicepat.Pickup({
    name: 'merchant name',
    phone: 'merchant phone',
    email: 'cs@merchant.com',
    date: '2019-09-17 16:00',
    address: 'pickup addresss',
    city: 'Jakarta Selatan'
  })

  var parcel = new Sicepat.Parcel({
    receipt_number: receiptNo,
    origin: 'JKT',
    type: 'REG',
    category: 'normal',
    content: 'Cosmetic',
    qty: 1,
    price: 2000000,
    weight: 1,
    shipper_name: 'merchant name',
    shipper_address: 'shipper address',
    shipper_province: 'DKI Jakarta',
    shipper_city: 'Jakarta Selatan',
    shipper_district: 'Pasar Minggu',
    shipper_zip: '12560',
    shipper_phone: 'shipper phone',
    recipient_title: 'Mr/Ms/Mrs',
    recipient_name: 'receipt_name',
    recipient_address: 'receipt_address',
    recipient_province: 'receipt_province',
    recipient_city: 'receipt_city',
    recipient_district: 'receipt_district',
    recipient_zip: 'receipt_zip',
    recipient_phone: 'receipt_phone',
    destination_code: 'CGK10000'
  })

  it('request', function (done) {
    sicepat.requestPickup(referenceNo, pickup, parcel, function (err, res) {
      assert.strictEqual(err, null)
      assert.strictEqual(receiptNo, res.datas[0].receipt_number)
      console.log(res)

      done()
    })
  })
})
