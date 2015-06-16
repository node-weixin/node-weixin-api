var assert = require('assert');
var crypto = require('crypto');

//Private variables

var appId = null;
var appSecrete = null;
var appToken = null;


var auth = {
  init: function(config) {
    assert(config.appId);
    assert(config.appSecrete);
    assert(config.appToken);
    this.initAuth(config.appId, config.appSecrete);
    this.initToken(config.appToken);
  },

  initAuth: function (id, secrete) {
    appId = id;
    appSecrete = secrete;
  },

  initToken: function (token) {
    appToken = token;
  },

  generateSignature: function (token, timestamp, nonce) {
    var mixes = [token, timestamp, nonce];
    mixes.sort();
    var str = mixes.join('');
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
  },

  check: function (signature, timestamp, nonce) {
    var newSignature = this.generateSignature(appToken, timestamp, nonce);
    if (newSignature === signature) {
      return true;
    }
    return false;
  }
};

module.exports = auth;
