'use strict'

const miscs = require('../miscs')

const REQUIRED = [
  'receipt_number',
  'origin', 'type', 'category', 'content', 'qty', 'price', 'weight',
  'recipient_title',
  'shipper_name', 'shipper_phone', 'shipper_address', 'shipper_province', 'shipper_city', 'shipper_district', 'shipper_zip', 'shipper_phone',
  'recipient_name', 'recipient_address', 'recipient_province', 'recipient_city', 'recipient_phone',
  'destination_code'
]

/**
 * Parcel
 * @param {object} param
 * @param {string} param.receipt_number
 * @param {string} param.origin
 * @param {string} param.type
 * @param {string} param.category
 * @param {string} param.content
 * @param {string} param.qty
 * @param {string} param.price
 * @param {string} param.weight
 * @param {string} param.receipt_title
 * @param {string} param.shipper_name
 * @param {string} param.shipper_phone
 * @param {string} param.shipper_address
 * @param {string} param.shipper_province
 * @param {string} param.shipper_city
 * @param {string} param.shipper_district
 * @param {string} param.shipper_zip
 * @param {string} param.shipper_phone
 * @param {string} param.recipient_name
 * @param {string} param.recipient_address
 * @param {string} param.recipient_province
 * @param {string} param.recipient_city
 * @param {string} param.recipient_phone
 * @param {string} param.destination_code
 */
function Parcel (param) {
  miscs.required(param, REQUIRED)

  for (var i in REQUIRED) {
    this[REQUIRED[i]] = param[REQUIRED[i]]
  }

  this.unitOfMeasure = 'Pcs'
}

module.exports = Parcel
