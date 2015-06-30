var assert = require('assert');
var crypto = require('crypto');
var validator = require('validator');

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

  getNonce: function () {
    var temp = new Date().getTime() + '';
    var crypt = crypto.createHash('md5');
    crypt.update(temp);
    return crypt.digest('hex').toUpperCase();
  },

  generateSignature: function (token, timestamp, nonce) {
    var mixes = [token, timestamp, nonce];
    mixes.sort();
    var str = mixes.join('');
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
  },

  getNonce: function (length) {
    length = length || 32;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var pos = chars.length;
    var nonces = [];
    var i;
    for (i = 0; i < length; i++) {
      nonces.push(chars.charAt(Math.floor(Math.random() * pos)));
    }
    return nonces.join('');
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

  marshall: function (params) {
    params = params || {};
    var keys = Object.keys(params).sort();
    var obj = {}, kvs = [];
    for (var i = 0; i < keys.length; i++) {
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
  ssl: null,
  init: function (id, key, ssl) {
    this.id = id;
    this.key = key;
    this.ssl = ssl;
  }
};

auth.device = {
  info: null
};

auth.pay = {
  toXml: function (params) {
    var lines = [];
    lines.push('<xml>');
    for (var k in params) {
      if (!params[k]) {
        continue;
      }
      if (validator.isNumeric(params[k]) || validator.isFloat(params[k])) {
        lines.push('<' + k + '>' + params[k] + '</' + k + '>');
      } else {
        lines.push('<' + k + '><![CDATA[' + params[k] + ']]></' + k + '>');
      }
    }
    lines.push('</xml>');
    return lines.join('');
  },
  prepare: function (data) {
    data.appid = auth.appId;
    data.mch_id = auth.merchant.id;
    if (auth.device_info) {
      data.device_info = auth.device.info;
    }
    data.nonce_str = auth.getNonce();
    return data;
  },
  sign: function (params) {
    var temp = auth.marshall(params);
    temp += 'key=' + auth.merchant.key;
    var crypt = crypto.createHash('md5');
    crypt.update(temp);
    return crypt.digest('hex').toUpperCase();
  },
  validate: function (data) {
    var config = require('./validate-config/pay');
    var v = require('node-form-validator');
    var errors = require('web-errors').errors;
    var conf = config.auth.header;
    var error = {};

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
