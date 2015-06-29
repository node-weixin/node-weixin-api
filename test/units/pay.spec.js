var assert = require("assert");
//var fs = require('fs');
var weixin = require('./../../index');

var validator = require('validator');
var errors = require("web-errors").errors;
var config = require("./../../lib/validate-config/index").pay;


describe("Weixin Pay Test", function () {

  it('should be able to handle unifiedOrder pay result', function (done) {
    var back;

    //Case FAIL
    back = {
      return_code: 'FAIL',
      return_msg: 'FAIL'
    };

    back = weixin.auth.pay.prepare(back);
    weixin.api.pay.handle(function(error, data) {
      assert.equal(true, error === errors.ERROR);
      assert.equal(true, data === 'FAIL');
    }, false, back, config.unified.receiving);

    //Case SUCCESS
    back = {
      return_code: 'SUCCESS',
      return_msg: '',
      result_code: 'SUCCESS',
      trade_type: ['JSAPI', 'NATIVE', 'APP'][0],
      prepay_id: '10303033',
      code_url: 'http://github.com'
    };

    back = weixin.auth.pay.prepare(back);
    weixin.api.pay.handle(function(error, data) {
      assert.equal(true, error === errors.SUCCESS);
      assert.equal(true, back.trade_type === data.trade_type);
      assert.equal(true, back.prepay_id === data.prepay_id);
      assert.equal(true, back.code_url === data.code_url);
      if (data.code_url) {
        validator.isURL(data.code_url);
      }

    }, false, back, config.unified.receiving);
    done();
  });
});
