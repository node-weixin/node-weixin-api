var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/';
var crypto = require('crypto');

var ticket = null;

//Last time got a token
var lastTime = null;
var jssdk = {
  passed: false,  //For test only
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
  sign: function(config) {
    var str = jssdk.marshall(config);
    var sha1 = crypto.createHash('sha1');
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


