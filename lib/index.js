var crypto = require('crypto');
var urls = require('./urls');

//Private variables

var appId = null;
var appSecrete = null;
var appToken = null;

module.exports = {

  init: function (config) {
    this.initAuth(config.appId, config.appSecrete);
    this.initToken(config.appToken);
  },

  initAuth: function (id, secrete) {
    appId = id;
    appSecrete = secrete;
  },

  initToken: function (token) {
    appToken = token;
  },

  generateSignature: function (token, timestamp, nonce) {
    var mixes = [token, timestamp, nonce];
    mixes.sort();
    var str = mixes.join('');
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
  },

  check: function (signature, timestamp, nonce) {
    var newSignature = this.generateSignature(appToken, timestamp, nonce);
    if (newSignature === signature) {
      return true;
    }
    return false;
  },
  menu: function (token) {
    var config = {
      appid: appId,
      redirect_uri: '',
      response_type: '',
      scope: '',
      state: '',
      '#wechat_redirect': ''
    }
    var url = urls.getMenu(token);
  }
};
