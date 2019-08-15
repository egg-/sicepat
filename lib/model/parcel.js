'use strict'

const miscs = require('../miscs')
const _ = require('lodash')

const REQUIRED = [
  'receipt_number',
  'origin', 'type', 'category', 'content', 'qty', 'price', 'weight',
  'shipper_phone',
  'recipient_title',
  'shipper_name', 'shipper_address', 'shipper_province', 'shipper_city', 'shipper_district', 'shipper_zip', 'shipper_phone',
  'recipient_name', 'recipient_address', 'recipient_province', 'recipient_city', 'recipient_phone',
  'destination_code'
]

function Parcel (param) {
  miscs.required(param, REQUIRED)

  for (var i in REQUIRED) {
    this[REQUIRED[i]] = param[REQUIRED[i]]
  }

  this.unitOfMeasure = 'Pcs'
}

module.exports = Parcel
