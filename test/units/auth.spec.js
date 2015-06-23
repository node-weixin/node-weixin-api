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
});

