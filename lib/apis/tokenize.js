var auth = require("./../auth");

var restful = require('./../restful');

var baseUrl = 'https://api.weixin.qq.com/cgi-bin/';


module.exports = function (cb) {

  var params = {
    grant_type: 'client_credential',
    appid: auth.appId,
    secret: auth.appSecret
  };
  var url = baseUrl + 'token?' + restful.toParam(params);

  restful.request(url, null, function(error, json) {
    if (!error) {
      auth.accessToken = json.access_token;
    }
    cb(error, json);
  });
};
