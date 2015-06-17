var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/';

function getUrl(type, params) {
  return baseUrl + type + '?' + restful.toParam(params);
}

module.exports = {
  shorten: function (url, cb) {
    var url = getUrl('shorturl');
    restful.json(url, {
      action: 'long2short',
      long_url: url
    }, cb);
  }
};
