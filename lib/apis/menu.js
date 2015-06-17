var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/menu/';
var selfUrl = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info';

module.exports = {
  getUrl: function(type) {
    return baseUrl + type + '?' + restful.toParam();
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
    var url = selfUrl + '?' + restful.toParam();
    restful.request(url, null, cb);
  }
};
