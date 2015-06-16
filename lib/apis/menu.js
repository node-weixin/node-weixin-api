var auth = require("./../auth");
var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/menu/';

module.exports = {
  getUrl: function(type) {
    var params = {
      access_token: auth.accessToken
    };
    return baseUrl + type + '?' + restful.toParam(params);
  },
  create: function (data, cb) {
    var url = this.getUrl('create');
    restful.json(url, data, cb);
  },
  remove: function(cb) {
    var url = this.getUrl('delete');
    restful.request(url, null, cb);
  },
  get: function(cb) {
    var url = this.getUrl('get');
    restful.request(url, null, cb);
  },

  self: function(cb) {
    var params = {
      access_token: auth.accessToken
    };
    var url = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info' + '?' + restful.toParam(params);
    restful.request(url, null, cb);
  }

};
