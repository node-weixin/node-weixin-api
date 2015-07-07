var auth = require("./../auth");
var validator = require("node-form-validator");
var errors = require("web-errors").errors;
var config = require('../validate-config/auth');
var weixin = require('../index');

module.exports = {
  ack: function(req, res) {
    var code = req.param('code');
    var state = req.param('state');
    if (!code) {
      res.redirect(config.urls.oauth.main);
      return;
    }

    weixin.api.user.oauth.authorize(code, state, function (error, json) {
      if (error) {
        res.notFound();
      } else {
        if (json.openid) {

          req.session.wxopenid = json.openid;
          res.redirect(config.url.oauth.success);
          return;
        }
        res.redirect(config.urls.oauth.main);
      }
    });
  }

};
