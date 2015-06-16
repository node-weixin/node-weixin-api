var auth = require("./../auth");

var restful = require('./../restful');

var baseUrl = 'https://api.weixin.qq.com/cgi-bin/';

module.exports = function (cb) {

    var params = {
      access_token: auth.accessToken
    };
  var url = baseUrl + 'getcallbackip?' + restful.toParam(params);

  restful.request(url, null, cb);
};
