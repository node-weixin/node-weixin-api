var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/';

module.exports = function (cb) {
  var url = baseUrl + 'getcallbackip?' + restful.toParam();
  restful.request(url, null, cb);
};
