var assert = require('assert');
var crypto = require('crypto');
var validator = require('validator');

//Last time got a token
var lastTime = null;

var oauth = {
  /**
   *  Create a url for weixin oauth
   *
   * @param state     User defined state to check use validation
   * @param scope     The scope of user info which app want to have
   * @param type      Response type of weixin api, currently on 'code' is supported
   * @returns {*}
   */
  createURL: function (state, scope, type) {
    assert((scope >= 0) && (scope <= 1));
    assert(state !== null);
    type = 0;
    var weixin = require('./index');
    var config = weixin.config;
    var params = {
      appid: config.app.appId,
      redirect_uri: config.urls.oauth.redirect,
      //Only on type currently
      response_type: ['code'][type],
      scope: ['snsapi_base', 'snsapi_userinfo'][scope],
      state: state
    };
    return weixin.api.user.oauth.buildUrl(params);
  },
  refresh: function(refreshToken, cb) {
    var oauthUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token';
    var params = {
      appId: config.app.appId,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };
    var url = oauthUrl + '?' + restful.toParam(params, true);
    restful.request(url, null, cb);
  },
  info: function(openid, accessToken) {
    var oauthUrl = 'https://api.weixin.qq.com/sns/userinfo';
    var params = {
      access_token: accessToken,
      openid: openid,
      lang: 'zh_CN'
    };
    var url = oauthUrl + '?' + restful.toParam(params, true);
    restful.request(url, null, cb);
  },
  validate: function(openid, accessToken, cb) {
    var url = 'https://api.weixin.qq.com/sns/auth';
    var params = {
      access_token: accessToken,
      openid: openid
    };
    var url = oauthUrl + '?' + restful.toParam(params, true);
    restful.request(url, null, function(error, json) {
      if (!json.errcode) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }
};

module.exports = oauth;
