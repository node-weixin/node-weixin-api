var URLs = {
  basic: 'https://api.weixin.qq.com/cgi-bin/',
  mp: 'https://mp.weixin.qq.com/cgi-bin/',
  file: 'http://file.api.weixin.qq.com/cgi-bin/',
  pay: 'https://api.weixin.qq.com/pay/',
  merchant: 'https://api.weixin.qq.com/merchant/',
  menu: 'https://api.weixin.qq.com/cgi-bin/menu/',
};

module.exports = {
  getAuth: function(id, secret) {
    return URLs.basic + 'token?grant_type=client_credential&appid=' + id + '&secret=' + secret;
  },
  getMenu: function(token) {
    return  URLs.menu + 'create?access_token=' + token;
  }
};
