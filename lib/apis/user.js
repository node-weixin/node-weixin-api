var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/user/';

function getUrl(type, params) {
  return baseUrl + type + '?' + restful.toParam(params);
}

module.exports = {
  info: function (id, cb) {
    var params = {
      openid: id,
      lang: 'zh-CN'
    };
    var url = getUrl('info', params);
    restful.request(url, null, cb);
  },
  list: function(id, cb) {
      var params = {};
    if (id) {
      params.next_openid = id;
    }
    var url = getUrl('get', params);
    restful.request(url, null, cb);
  }
};
