var auth = require("./../auth");
var validator = require("req-validator");
var errors = require("web-errors").errors;

var urls = require('./../urls');


module.exports = function (cb) {

  var params = {
    access_token: 'client_credential',
    appid: auth.appId,
    secret: auth.appSecret
  };
  https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
  urls.request(params, cb);
};
