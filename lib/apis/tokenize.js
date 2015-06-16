var auth = require("./../auth");
var validator = require("req-validator");
var errors = require("web-errors").errors;

var urls = require('./../urls');


module.exports = function (cb) {

  var params = {
    grant_type: 'client_credential',
    appid: auth.appId,
    secret: auth.appSecret
  };

  urls.request(params, cb);
/*
  var url = urls.getToken(params);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(true, body)
    } else {
      cb(false, body);
    }
  });
  */

};
