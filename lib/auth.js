var assert = require('assert');
var crypto = require('crypto');

var auth = {
  appId: null,
  appSecret: null,
  appToken: null,
  accessToken: null,
  init: function (config) {
    assert(config.appId);
    assert(config.appSecret);
    assert(config.appToken);
    this.initAuth(config.appId, config.appSecret);
    this.initToken(config.appToken);
  },

  initAuth: function (id, secret) {
    this.appId = id;
    this.appSecret = secret;
  },

  initToken: function (token) {
    this.appToken = token;
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
    var newSignature = this.generateSignature(this.appToken, timestamp, nonce);
    if (newSignature === signature) {
      return true;
    }
    return false;
  },
  setAccessToken: function(token) {
    this.accessToken = token;
  }
};

module.exports = auth;
