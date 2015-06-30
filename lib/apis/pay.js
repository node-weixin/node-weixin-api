/**
 * Weixin Pay ver 3.3.7
 * @type {*|exports|module.exports}
 */
'use strict';
var xml2json = require('xml2json');

var json2xml = require('json2xml');

var v = require('node-form-validator');
var errors = require("web-errors").errors;
var _ = require("lodash");

var restful = require('./../restful');
var auth = require('./../auth');
var config = require('../validate-config/pay');


var pay = {
  handle: function (cb, error, json, validate) {
    if (error) {
      cb(errors.ERROR, json);
      return;
    } else {
      var returnCode = json.return_code;
      var returnMsg = json.return_msg;
      switch (returnCode) {
        case 'SUCCESS':
          var vError = auth.pay.validate(json);
          if (true !== vError) {
            return cb(vError)
          }
          if (validate === null) {
            return cb(errors.SUCCESS, null, json);
          }
          var resultCode = json.result_code;
          switch (resultCode) {
            case 'SUCCESS':
              if (!v.validate(validate, json, error)) {
                cb(errors.ERROR, error);
                return;
              }
              var result = v.json.extract(json, validate);
              cb(errors.SUCCESS, result, json);
              break;
          }
          break;
        default :
          cb(errors.ERROR, returnMsg);
      }
    }
  },
  /**
   * Basic http request for pay apis
   * @param url
   * @param data
   * @param sendConfig
   * @param receiveConfig
   * @param cb
   */
  request: function (url, data, sendConfig, receiveConfig, cb) {
    var error = {};
    if (!v.validate(sendConfig, data, error)) {
      cb(errors.INPUT_INVALID, error);
      return;
    }
    var params = _.clone(data);
    params = auth.pay.prepare(params);
    params.sign = auth.pay.sign(params);
    var xml = auth.pay.toXml(params);
    console.log(auth.merchant.ssl);

    restful.xmlssl(url, xml, function(err, json) {
      pay.handle(cb, error, json, receiveConfig);
    }, auth.merchant.ssl);
  },
  unifiedOrder: function (data, cb) {
    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    this.request(url, data,
      config.unified.sending,
      config.unified.receiving,
      cb);
  },
  order: {
    query: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/orderquery';
      this.request(url, data,
        config.order.query,
        config.order.trade,
        cb);
    },
    close: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/closeorder';
      this.request(url, data,
        config.order.query,
        config.order.trade,
        cb);
    },


  },
  refund : {
    create: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/secapi/pay/refund';
      this.request(url, data,
        config.refund.create.sending,
        config.refund.create.receiving,
        cb);
    },
    query: function (data, cb) {
      var url = 'https://api.mch.weixin.qq.com/pay/refundquery';
      this.request(url, data,
        config.refund.query.sending,
        config.refund.query.receiving,
        cb);
    }
  },
  statements: function(data, cb) {
    var url = 'https://api.mch.weixin.qq.com/pay/downloadbill';
    this.request(url, data,
      config.statements.sending,
      null,
      cb);
  },
  report: function(data, cb) {
    var url = 'https://api.mch.weixin.qq.com/payitil/report';
    this.request(url, data,
      config.report.sending,
      null,
      cb);
  }
};

module.exports = pay;
