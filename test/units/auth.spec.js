var assert = require("assert");

var appId = 'wx0201661ce8fb3e11';
var appSecrete = '483585a84eacd76693855485cb88dc8a';

var appToken = 'didsosdifsofisdofisfosjfosjfsodf';




describe("Weixin Unit Test", function () {
  var weixin = require('../../index');
  var signature;
  var timestamp = new Date();
  var nonce = 'sdfsdsdfsdf';

  it('should initAuth', function(done){
    weixin.initAuth(appId, appSecrete);
    assert(weixin.appId === appId);
    assert(weixin.appSecrete === appSecrete);
    done();
  });


  it('should initToken', function(done){
    weixin.initToken(appToken);
    assert(weixin.appToken === appToken);
    done();
  });

  it('should be able to generate signature', function(done){
    timestamp = timestamp.getTime();

    signature = weixin.generateSignature(appToken, timestamp, nonce);
    assert(!!signature);
    done();
  });

  it('should be able to check signature', function(done){
    var result = weixin.check(signature, timestamp, nonce);
    assert(result);
    done();
  });
});

