var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/';
var selfUrl = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info';

module.exports = {
  ticket: function(cb) {
    var params = {
      type: 'jsapi'
    }
    var url = baseUrl + 'getticket?' + restful.toParam(params);
    restful.request(url, null, cb);
  }
};


