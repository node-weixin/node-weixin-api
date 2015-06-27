var assert = require("assert");
var config = require('./../config').app;
var weixin = require('./../../index');


describe("Weixin Unit Test", function () {
  var signature;
  var timestamp = new Date();
  var nonce = 'sdfsdsdfsdf';

  it('should init', function(done){
    weixin.auth.init(config);
    done();
  });

  it('should be able to generate signature', function(done){
    timestamp = timestamp.getTime();
    signature = weixin.auth.generateSignature(config.appToken, timestamp, nonce);
    assert(!!signature);
    done();
  });

  it('should be able to check signature', function(done){
    var result = weixin.auth.check(signature, timestamp, nonce);
    assert(result);
    done();
  });

  it('should be able to generate params', function(done){
    var params = {
      a: 'b',
      c: 'd'
    };
    var result = weixin.restful.toParam(params, true);
    assert.equal(true, result === 'a=b&c=d');
    done();
  });

  it('should be able to marshall params', function(done){
    var params = {
      a: 'b',
      d: 'd',
      c: 'd',
      1: 'hello',

    };
    var result = weixin.auth.marshall(params);
    assert.equal(true, result === '1=hello&a=b&c=d&d=d');
    done();
  });

  it('should be able to get a pay signature', function(done){
    var params = {
      a: 'b',
      d: 'd',
      c: 'd',
      1: 'hello',
    };
    var key = 'aa'
    weixin.auth.merchant.init(1, 'aa', null);
    var result = weixin.auth.pay.sign(params);
    assert.equal(true, result === 'B6D97C5339B55A396D5DD89D1BE6DD17');
    done();
  });
});

