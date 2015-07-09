#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

Weixin API for node

===========

微信公共平台API

由于现有的node weixin api接口做的比较麻烦，不利于书写与理解．故重新书写代码，架构．
让开发者更容易理解与使用，并且帮助提升软件质量


## 安装

```sh
$ npm install --save node-weixin-api
```

##测试注意

在test目录创建private/app.js文件

```
module.exports = {
  app: {
    appId: '',
    appSecret: '',
    appToken: '',
  },
  merchant: {
    id: '123',
    key: '212',
    ssl: {
      cert: null,
      key: null
    }
  }
};
```


## 使用

```js
var weixin = require('node-weixin-api');
var config = require('./config');

//初始化
//所有共用
weixin.auth.init(config);

//验证服务器
//req, res是expressjs的req, res,直接传入即可．
weixin.api.auth(req, res);


//获取Token
weixin.api.tokenize(function (error, json) {
//正常情况json.access_token即是所需要的token
//一般是不需要开发者保存，因为本库已经替为保存了
});

//获取各种所需要的接口

weixin.api.menu.create
weixin.api.menu.get
weixin.api.menu.remove

//由于接口都会非常简单，所以不在一一列举．

//同时也欢迎对没有完善的接口提交pull request


//微信OAuth 代码(以支持expressjs的服务器为例)

  //Oauth 2 init page
  //用户第一次访问时代码
  auth: function (req, res) {
    var redirect_uri = oauth.redirectUrl;
    var state = 'YOUR_STATE';
    var params = {
      appid: config.YOUR_APPID,
      redirect_uri: config.YOUR_REDIRECT_URL,
      response_type: 'code',
      scope: 'snsapi_base',
      state: state,
      connect_redirect: 1
    };
    var url = weixin.api.user.oauth.buildUrl(params);
    res.redirect(url);
  },

  //Oauth 2 redirect page
  //微信通过后的代码,由code获取openid
  authback: function (req, res) {
    var code = req.param('code');
    var state = req.param('state');
    if (!code) {
      res.redirect(YOUR_REDIRECT_URL);
      return;
    }


    weixin.api.user.oauth.authorize(code, state, function (error, json) {
      if (error) {
        res.notFound();
      } else {
        if (json.openid) {

          req.session.YOUR_OPENID_SAVE_NAME = json.openid;
          res.redirect(YOUR_REDIRECT_URL);
          return;
        }
        res.redirect(YOUR_REDIRECT_URL_FAILED);
      }
    });
  }
```

```sh
$ npm install --global node-weixin-api
$ node-weixin-api --help
```


## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-weixin-api.svg
[npm-url]: https://npmjs.org/package/node-weixin-api
[travis-image]: https://travis-ci.org/JSSDKCN/node-weixin-api.svg?branch=master
[travis-url]: https://travis-ci.org/JSSDKCN/node-weixin-api
[daviddm-image]: https://david-dm.org/JSSDKCN/node-weixin-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/JSSDKCN/node-weixin-api
