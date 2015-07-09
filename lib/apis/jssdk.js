var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/';
var crypto = require('crypto');
var errors = require('web-errors').errors;

var ticket = null;

//Last time got a token
var lastTime = null;
var jssdk = {
  passed: false,  //For test only
  //for real use
  prepay: function(prepayId) {
    var weixin = require('../index');
    var config = weixin.config;
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    var timeStamp = String(new Date().getTime());

    md5.update(timeStamp);
    timeStamp = Math.floor(timeStamp / 1000);

    var nonceStr = md5.digest('hex');
    var data = {
      appId: config.app.appId,
      timeStamp: String(timeStamp),
      nonceStr: nonceStr,
      package: 'prepay_id=' + prepayId,
      signType: 'MD5'
    };
    paySign = weixin.auth.pay.sign(data);
    data.paySign = paySign;
    return data;
  },
  prepare: function(cb) {
    var weixin = require('../index');
    var config = weixin.config;
    weixin.auth.determine(function () {
      jssdk.signify(config.urls.js.main, function (error, json) {
        if (!error && !json.errcode) {
          cb(errors.SUCCESS, {
            appId: config.app.appId,
            signature: json.signature,
            nonceStr: json.noncestr,
            timestamp: json.timestamp
          });
        } else {
          cb(errors.ERROR, error);
        }
      });
    });
  },
  getTicket: function (cb) {
    jssdk.passed = false;
    var now = new Date().getTime();
    var MAX_GAP = 7200;
    if (lastTime && (now - lastTime < MAX_GAP)) {
      jssdk.passed = true;
      cb(false, ticket);
      return;
    }
    lastTime = now;
    jssdk.ticket(function (error, json) {
      if (json.errcode === 0) {
        ticket = json.ticket;
        cb(false, json.ticket);
      } else {
        cb(true);
      }
    });
  },
  ticket: function (cb) {
    var params = {
      type: 'jsapi'
    };
    var url = baseUrl + 'getticket?' + restful.toParam(params);
    restful.request(url, null, cb);
  },
  signify: function (url, cb) {
    jssdk.getTicket(function (error, ticket) {
      if (!error) {
        var config = jssdk.generate(ticket, url);
        var signature = jssdk.sign(config);
        config.signature = signature;
        cb(false, config);
      } else {
        cb(true);
      }
    });
  },
  sign: function(config, type) {
    var str = jssdk.marshall(config);
    var sha1 = crypto.createHash(type || 'sha1');
    sha1.update(str);
    return sha1.digest('hex');
  },
  marshall: function (params) {
    params = params || {};
    var keys = Object.keys(params);
    var pairs = [];
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      pairs.push(k + '=' + params[k]);
    }
    return pairs.join('&');
  },
  generate: function (ticket, url) {
    var timestamp = String(new Date().getTime());
    var sha1 = crypto.createHash('sha1');
    sha1.update(timestamp);
    var noncestr = sha1.digest('hex');
    return {
      jsapi_ticket: ticket,
      noncestr: noncestr,
      timestamp: timestamp,
      url: url
    }
  }
};

module.exports = jssdk;


