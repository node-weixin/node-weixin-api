/**
 * Weixin Pay ver 3.3.7
 * @type {*|exports|module.exports}
 */

var restful = require('./../restful');
var auth = require('./../auth');
var v = require('node-form-validator');
var errors = require("web-errors").errors;
var config = require('../../validate-config/pay');

module.exports = {
  unifiedOrder: function (data, cb) {
    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

    if (!v.validate(config.creation, data, error)) {
      cb(errors.INPUT_INVALID, error);
      return;
    }

    data.sign = auth.pay.sign(data);

    var xml2json = require('node-xml2json');
    restful.xml(url, xml2json.toXml(data), function(error, json) {
      if (error) {
        cb(errors.ERROR, json);
      } else {
        var returnCode = json.return_code;
        var returnMsg = json.return_msg;
        switch (returnCode) {
          case 'SUCCESS':
            var vError = auth.pay.validate(json);
            if (true !== vError) {
              return cb(vError)
            }
            var resultCode = json.result_code;
            switch (resultCode) {
              case 'SUCCESS':
                if (!v.validate(config.success, json, error)) {
                  cb(errors.ERROR, error);
                  return;
                }
                var data = v.extract(config.success, json);
                cb(errors.SUCCESS, data);
                break;
            }
            break;
          default :
            cb(errors.ERROR, returnMsg);
        }
      }
    });
  },

};
