var assert = require('assert');
var crypto = require('crypto');
var config = require('../validate-config/pay');


//Last time got a token
var lastTime = null;

var auth = {
  appId: null,
  appSecret: null,
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
  },

  marshall: function(params) {
    params = params || {};
    var keys = Object.keys(params).sort();
    var obj = {}, kvs = [];
    for(var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (params[k]) {
        obj[k] = params[k];
          kvs.push(keys[i] + '=' + params[k]);
      }
    }
    return kvs.join('&');
  }
};
auth.merchant = {
  id: null,
  key: null,
  cert: null,
  init: function(id, key, cert) {
    this.id = id;
    this.key = key;
    this.cert = cert;
  }
};

auth.pay = {
  sign: function(params) {
    var temp = auth.marshall(params);
    temp += 'key=' + auth.merchant.key;
    var crypt = crypto.createHash('md5');
    crypt.update(temp);
    return crypt.digest('hex').toUpperCase();
  },
  validate: function(data) {
    var conf = config.auth;
    var v = require('node-form-validator');
    if (!v.validate(conf, data, error)) {
      return errors.ERROR;
    }
    if (data.appid !== auth.appId) {
      return errors.APP_ID_ERROR;
    }
    if (data.mch_id !== auth.merchant.id) {
      return errors.MERCHANT_ID_ERROR;
    }
    return true;
  }
};

module.exports = auth;
