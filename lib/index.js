var api = require('./apis/index');
var auth = require('./auth');
var restful = require('./restful');
var callback = require('./callbacks/index');
var oauth = require('./oauth');

module.exports = {
  config: require('./config'),
  auth: auth,
  oauth: oauth,
  api: api,
  callback: callback,
  restful: restful,
  init: function(config) {
    this.config = config;
    auth.init(config.app);
    auth.merchant.init(config.merchant.id, config.merchant.key, config.merchant.ssl);
  }
};
