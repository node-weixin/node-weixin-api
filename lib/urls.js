var URLs = {
  basic: 'https://api.weixin.qq.com/cgi-bin/',
  mp: 'https://mp.weixin.qq.com/cgi-bin/',
  file: 'http://file.api.weixin.qq.com/cgi-bin/',
  pay: 'https://api.weixin.qq.com/pay/',
  merchant: 'https://api.weixin.qq.com/merchant/',
  menu: 'https://api.weixin.qq.com/cgi-bin/menu/',
  auth: 'https://open.weixin.qq.com/connect/oauth2/'
};

module.exports = {
  toParam: function(o) {
    var keys = [];
    for(var k in o) {
      keys.push(k + '=' + o[k]);
    }
    return keys.join('&');
  },
  getToken: function(o) {
    return URLs.basic + 'token?' + this.toParam(o);
  },
  getMenu: function(token) {
    return  URLs.menu + 'create?' + this.toParam(o);
  },
  getOAuth2: function(o) {
    return URLs.auth + 'authorize?' + this.toParam(o);
  }
};
