'use strict'

const miscs = require('./miscs')
const Client = require('./client')

/**
 * Sicepat
 * @param {object} config config
 * @param {string} config.apikey
 * @param {boolean} [config.devmode] dev mode
 */
function Sicepat (config) {
  miscs.required(config, ['apikey'])

  this.apikey = config.apikey
  this.client = new Client({
    apikey: config.apikey,
    devmode: config.devmode
  })
}

/**
 * request pickup
 * @param {string} referenceNo internal reference for pickup request
 * @param {Pickup} pickup
 * @param {Parcel} parcel
 */
Sicepat.prototype.requestPickup = function (referenceNo, pickup, parcel, cb) {
  var param = {
    endpoint: '/api/partner/requestpickuppackage',
    method: 'POST',
    data: {}
  }

  param.data.reference_number = referenceNo

  // pickup
  param.data.pickup_merchant_name = pickup.name
  param.data.pickup_merchant_phone = pickup.phone
  param.data.pickup_merchant_email = pickup.email
  param.data.pickup_request_date = pickup.date
  param.data.pickup_address = pickup.address
  param.data.pickup_city = pickup.city

  // parcel
  param.data.PackageList = [{
    receipt_number: parcel.receipt_number,
    origin_code: parcel.origin,
    delivery_type: parcel.type,
    parcel_category: parcel.category,
    parcel_content: parcel.content,
    parcel_qty: parcel.qty,
    parcel_uom: parcel.unitOfMeasure,
    parcel_value: parcel.price,
    total_weight: parcel.weight,
    shipper_name: parcel.shipper_name,
    shipper_address: parcel.shipper_address,
    shipper_province: parcel.shipper_province,
    shipper_city: parcel.shipper_city,
    shipper_district: parcel.shipper_district,
    shipper_zip: parcel.shipper_zip,
    shipper_phone: parcel.shipper_phone,
    recipient_title: parcel.recipient_title || '',
    recipient_name: parcel.recipient_name,
    recipient_address: parcel.recipient_address,
    recipient_province: parcel.recipient_province,
    recipient_city: parcel.recipient_city,
    recipient_district: parcel.recipient_district,
    recipient_zip: parcel.recipient_zip,
    recipient_phone: parcel.recipient_phone,
    recipient_email: parcel.recipient_email,
    destination_code: parcel.destination_code
  }]
  this.client.request(param, cb)
}

/**
 * request cancel pickup
 * @param {string} receiptNo receipt_number
 */
Sicepat.prototype.cancelPickup = function (receiptNo, cb) {
  var param = {
    endpoint: '/api/partner/cancelpickup',
    method: 'POST',
    data: {
      receipt_number: receiptNo
    }
  }
  this.client.request(param, cb)
}

Sicepat.Parcel = require('./model/parcel')
Sicepat.Pickup = require('./model/pickup')

module.exports = Sicepat
