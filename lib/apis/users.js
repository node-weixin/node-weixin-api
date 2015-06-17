var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/groups';


module.exports = {

  groups: {
    create: function(json, cb) {
      var params = {
        access_token: auth.accessToken
      };
      return baseUrl + type + '?' + restful.toParam(params);
    }
  },
  getUrl: function(type) {
    var params = {
      access_token: auth.accessToken
    };
    return baseUrl + type + '?' + restful.toParam(params);
  },
  createGroup: function (data, cb) {
    var url = this.getUrl('create');

    //POST数据例子：{"group":{"name":"test"}}

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
