var auth = require("./../auth");
var validator = require("node-form-validator");
var errors = require("web-errors").errors;

var signature = {};

module.exports = {
  notify: function(req, res) {
    var data = {};
    var error = {};

    var xml = req.body;
    var xml2json = require('node-xml2json');

    var json = xml2json.toJSON(xml);

    var returnCode = json.return_code;
    var returnMsg = json.return_msg;
    switch (return_code) {
      case 'SUCCESS':

        break;
      default :
        res.end();
    }

    var conf = {
      return_code: {
        type: 'string',
        maxLength: 10,
        required: true
      },
      return_msg: {
        type: 'string',

      },
      //Successfully
      appid: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      mch_id: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      device_info: {
        type: 'string',
        maxLength: 32,
      },

      nonce_str: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      sign: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      body: {
        type: 'string',
        maxLength: 127,
        required: true
      },
      attach: {
        type: 'string',
        maxLength: 127,
      },
      out_trade_no: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      total_fee: {
        type: 'int',
        required: true
      },
      spbill_create_ip: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      time_start: {
        type: 'string',
        maxLength: 14,
        required: true
      },
      time_expire: {
        type: 'string',
        maxLength: 14,
        required: true
      },
      goods_tag: {
        type: 'string',
        maxLength: 32
      },
      notify_url: {
        type: 'string',
        maxLength: 256,
        required: true
      },
      trade_type: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      openid: {
        type: 'string',
        maxLength: 128,
      },
      product_id: {
        type: 'string',
        maxLength: 128,
      }
    };

    if (!validator.v(req, conf, data, error)) {
      res.send(errors.INPUT_INVALID);
      return;
    }
    var check = auth.check(data.signature, data.timestamp, data.nonce)
    if (check) {
      signature = data;
      res.send(data.echostr);
    } else {
      res.send('Signature not match!');
    }
  }
};
