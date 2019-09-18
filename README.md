# sicepat

[![version](https://img.shields.io/npm/v/sicepat.svg)](https://www.npmjs.com/package/sicepat) [![download](https://img.shields.io/npm/dm/sicepat.svg)](https://www.npmjs.com/package/sicepat)
[![status status](https://travis-ci.org/egg-/sicepat.svg?branch=master)](https://travis-ci.org/egg-/sicepat)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Node.js module for using the sicepat API

## Usage

```javascript
var sicepat = new Sicepat({
  apikey: config.api.apikey,
  devmode: config.api.devmode
})
var referenceNo = 'TEST-REFERENCE_NO'

var pickup = new Sicepat.Pickup({
  name: 'merchant name',
  phone: 'merchant phone',
  email: 'cs@merchant.com',
  date: '2019-09-17 16:00',
  address: 'pickup addresss',
  city: 'Jakarta Selatan'
})

var parcel = new Sicepat.Parcel({
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

sicepat.requestPickup(referenceNo, pickup, parcel, function (err, res) {
  if (err) {
    // ...
  }
  console.log(res)
  // { status: '200',
  //   error_message: null,
  //   request_number: '1909180011270005',
  //   receipt_datetime: '2019-09-18 17:25',
  //   message: null,
  //   datas: [ { cust_package_id: null, receipt_number: '653851825686' } ] }

  sicepat.cancelPickup(res.datas[0].receipt_number, function (err, res) {
    console.log(res)
    // { status: '200',
    // error_message: null,
    // request_number: '1909180011270005',
    // message: 'request_number: 1909180011270005 sudah di cancel.' }
  })
})
```