var assert = require('assert');
var crypto = require('crypto');

//Last time got a token
var lastTime = null;

var auth = {
  appSecret: null,

  appId: null,
  appToken: null,
  accessToken: null,
  init: function (config) {
    assert(config.appId);
    assert(config.appSecret);
    assert(config.appToken);
    auth.initAuth(config.appId, config.appSecret);
    auth.initToken(config.appToken);
  },

  initAuth: function (id, secret) {
    auth.appId = id;
    auth.appSecret = secret;
  },

  initToken: function (token) {
    auth.appToken = token;
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
    var newSignature = auth.generateSignature(auth.appToken, timestamp, nonce);
    if (newSignature === signature) {
      return true;
    }
    return false;
  },
  determine: function (cb) {
    var now = new Date().getTime();
    var MAX_GAP = 7200;
    if (lastTime && (now - lastTime < MAX_GAP)) {
      cb();
      return;
    }
    lastTime = now;
    auth.tokenize(cb);
  },

  tokenize: function (cb) {
    var restful = require('./restful');
    var baseUrl = 'https://api.weixin.qq.com/cgi-bin/';
    var params = {
      grant_type: 'client_credential',
      appid: auth.appId,
      secret: auth.appSecret
    };
    var url = baseUrl + 'token?' + restful.toParam(params, true);

    restful.request(url, null, function (error, json) {
      if (!error) {
        auth.accessToken = json.access_token;
      }
      cb(error, json);
    });
  }
};

module.exports = auth;
