var urls = require('./urls');

module.exports = {
  appId: null,
  appSecrete: null,
  appToken: null,

  initAuth: function(id, secrete) {
    this.appId = id;
    this.appSecrete = secrete;
  },

  initToken: function(token) {
    this.appToken = token;
  },

  generateSignature: function(token, timestamp, nonce) {
    var mixes = [token, timestamp, nonce];
    mixes.sort();
    var str = mixes.join('');
    var crypto = require('crypto');
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
  },

  check: function(signature, timestamp, nonce) {
    var newSignature = this.generateSignature(this.appToken, timestamp, nonce);
    if (newSignature === signature) {
      return true;
    }
    return false;
  },
  menu: function(token) {
    var url = urls.getMenu(token);
  }
};
