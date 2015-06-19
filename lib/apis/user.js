var restful = require('./../restful');
var auth = require('./../auth');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/user/';

function getUrl(type, params) {
  return baseUrl + type + '?' + restful.toParam(params);
}

var user = {
  info: function (id, cb) {
    var params = {
      openid: id,
      lang: 'zh-CN'
    };
    var url = getUrl('info', params);
    restful.request(url, null, cb);
  },
  list: function(id, cb) {
    var params = {};
    if (id) {
      params.next_openid = id;
    }
    var url = getUrl('get', params);
    restful.request(url, null, cb);
  },
  oauth: {
    buildUrl: function(params) {
      var oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
      return oauthUrl + '?' + restful.toParam(params, true) + '#wechat_redirect';
    },
    tokenize: function(params, cb) {
      var oauthUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token';

      var url = oauthUrl + '?' + restful.toParam(params) + '#wechat_redirect';
      restful.request(url, null, cb);
    },
    authorize: function(code, state, cb) {
      var baseUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token';
      var params = {
        appid: auth.appId,
        secret: auth.appSecret,
        grant_type: 'authorization_code',
        code: code
      };
      user.oauth.tokenize(params, function(error, json) {
        console.log(error);
        console.log(json);
        if (error) {
          cb(true);
        } else {
          cb(false, json);
        }

      });
    }

  }
};

module.exports =  user;
