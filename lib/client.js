'use strict'

const request = require('request')
const _ = require('lodash')

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
 * request pickup packages
 * @param  {object}   param
 * @param  {array<Parcel>}   param.items
 * @param  {function} cb
 */
Client.prototype.requestPickup = function (param, cb) {
  request({
    uri: this.endpoint + '/api/partner/requestpickuppackage',
    method: 'POST',
    json: true,
    body: {
      auth_key: this.apikey,
      reference_number: param.reference_number,
      pickup_request_date: param.pickup.date,
      // pickup_merchant_code: ''
      pickup_merchant_name: param.pickup.name,
      pickup_merchant_phone: param.pickup.phone,
      pickup_merchant_email: param.pickup.email,
      pickup_address: param.pickup.address,
      pickup_city: param.pickup.city,
      PackageList: _.map(param.items, function (o) {
        return {
          receipt_number: o.receipt_number,
          origin_code: o.origin,
          delivery_type: o.type,
          parcel_category: o.category,
          parcel_content: o.content,
          parcel_qty: o.qty,
          parcel_uom: o.unitOfMeasure,
          parcel_value: o.price,
          total_weight: o.weight,
          shipper_name: o.shipper_name,
          shipper_address: o.shipper_address,
          shipper_province: o.shipper_province,
          shipper_city: o.shipper_city,
          shipper_district: o.shipper_district,
          shipper_zip: o.shipper_zip,
          shipper_phone: o.shipper_phone,
          recipient_title: o.recipient_title || '',
          recipient_name: o.recipient_name,
          recipient_address: o.recipient_address,
          recipient_province: o.recipient_province,
          recipient_city: o.recipient_city,
          recipient_district: o.recipient_district,
          recipient_zip: o.recipient_zip,
          recipient_phone: o.recipient_phone,
          destination_code: o.destination_code
        }
      })
    }
  }, function (err, rep, body) {
    if (err) {
      return cb(err)
    }

    cb(null, body)
  })
}

/**
 * cancel pickup
 * @param {object} param
 * @param {string} param.receipt_number
 */
Client.prototype.cancelPickup = function (param, cb) {
  request({
    uri: this.endpoint + '/api/partner/cancelpickup',
    method: 'POST',
    json: true,
    body: {
      auth_key: this.apikey,
      receipt_number: param.receipt_number
    }
  }, function (err, res, body) {
    if (err) {
      return cb(err)
    }
    cb(null, body)
  })
}

module.exports = Client
