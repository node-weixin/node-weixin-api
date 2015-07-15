var auth = require("./../auth");
var validator = require("node-form-validator");
var errors = require("web-errors").errors;

module.exports = {
  /**
   * Callback when oauth from weixin is successful.
   *
   * @param req       HTTP Request
   * @param res       HTTP Response
   * @param cb        Callback when the openid is retrieved from the server
   * @param redirect  redirect if it is true
   */
  success: function(req, res, cb, redirect) {
    var code = req.param('code');
    var state = req.param('state');
    var weixin = require('../index');
    var config = weixin.config;
    if (!code) {

      res.redirect(config.urls.oauth.init);
      return;
    }

    weixin.api.user.oauth.authorize(code, state, function (error, json) {
      if (error) {
        res.notFound();
      } else {
        if (json.openid) {
          req.session.wxopenid = json.openid;
          req.session.accessToken = json.access_token;
          req.session.refreshToken = json.refresh_token;
          if (cb) {
            cb(json);
          }
          if (redirect) {
            res.redirect(config.urls.oauth.success);
          }
          return;
        }
        res.redirect(config.urls.oauth.init);
      }
    });
  }

};
