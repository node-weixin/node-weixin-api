var assert = require("assert");
var config = require('./../config');
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

  it('should update menu items', function(done) {
    done();
  });
});

