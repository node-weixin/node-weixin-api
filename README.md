#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

Weixin API for node

===========

微信公共平台API

由于现有的node weixin api接口做的比较麻烦，不利于书写与理解．故重新书写代码，架构．
让开发者更容易理解与使用，并且帮助提升软件质量

交流QQ群: 39287176



## 安装

```sh
$ npm install --save node-weixin-api
```


## 使用


###配置数据

```js
  module.exports = {
    app: {
      appId: 'YOUR_APP_ID',
      appSecret: 'YOUR_APP_SECRET',
      appToken: 'YOUR_APP_TOKEN'
    },
    merchant: {
      id: 'YOUR_MERCHANT_ID',
      key: 'YOUR_MERCHANT_KEY',
      ssl: {
        cert: fs.readFileSync(YOUR_CERT_FILE_PATH),
        key: fs.readFileSync(YOUR_KEY_FILE_PATH)
      }
    },
    urls: {
      js: {
        //jssdk 支付页面的URL测试目录， 也是在微信里配置的目录
        main: 'http://jspay.domain.com/'
      },
      oauth: {
        //用户首次访问的URL地址
        init: 'http://oauth.domain.com/weixin/init',
        //用户通过验证后的返回地址
        redirect: 'http://oauth.domain.com/weixin/back',
        //成功获取用户openid后的地址
        success: 'http://pay.domain.com/successAndReadyToPay'
      }
    }
  }
```
> ####测试注意
  在test目录创建private/app.js文件,内容同上

###初始化


```js

//引入包
var weixin = require('node-weixin-api');

//加载配置文件
var config = require('./config');

//初始化
//所有共用
weixin.init(config);

```

###验证服务器(用于公共平台服务器验证时)

```js
//req, res是expressjs的req, res,直接传入即可．
weixin.callback.auth.ack(req, res);

```

###获取Token

```js

weixin.api.tokenize(function (error, json) {
//正常情况json.access_token即是所需要的token
//一般是不需要开发者保存，因为本库已经替为保存了
});

```

###确保Token是不过期的
使用函数
weixin.auth.determine
确保Token是不过期的
调用方式

```js

weixin.auth.determine(function() {
  //你的代码，需要accessToken
});

```

###网页Oauth相关

#### 1. 生成访问微信URL

```js
  auth: function (req, res) {
    var url = weixin.oauth.createURL('init', 1);
    res.redirect(url);
  }
```

#### 2. 微信验证成功后返回处理

```
  authback: function (req, res) {
    weixin.callback.oauth.success(req, res, function(json) {
    
      //得到用户的openid
      req.session.wxopenid = json.openid;
      req.session.accessToken = json.access_token;
      req.session.refreshToken = json.refresh_token;
    });
  }
```

###jssdk 相关API

#### 1. 获取jssdk的配置信息

```js
      weixin.api.jssdk.prepare(function (error, json) {
        var errors = require('web-errors').errors;
        //json就是配置信息
        //可以直接返回给js
      });
```

#### 2. 创建一次统一支付请求的js配置

```js
      var data = {};
      
      //上次保存的openid信息
      data.openid = req.session.wxopenid;
      
      //支付相关的信息
      data.body = 'description';
      data.out_trade_no = order.id;
      data.total_fee = (order.summary * 100).toFixed(0);
      data.notify_url = sails.config.weixin.urls.notify;
      data.trade_type = type || 'JSAPI';

      // mostly useless
      //data.sub_mch_id = 'xxx'
      //data.device_info = 'xxx'
      //data.attach = 'xxx'
      //data.time_start = 'xxx'
      //data.time_expire = 'xxx'
      //data.goods_tag = 'xxx'
      //data.product_id = 'xxx'
      //data.attach = 'xxx'
      console.log(data);
      console.log('pay');

      weixin.api.pay.unifiedOrder(data, function (error, data) {
        if (error.code) {
          api(errors.ERROR, res, error);
          return;
        }
        var prepayId = data.prepay_id;
        var data = weixin.api.jssdk.prepay(data.prepay_id);
        //data就是这次的配置信息
        api(errors.SUCCESS, res, data);
      });
```


###各类基本API

#### 1. 获取服务器IP

```js

    weixin.auth.determine(function () {
      weixin.api.ip(function (error, json) {
      //json.ip_list是返回的ip列表
      });
    });
  
```

#### 2. 获取公共号菜单

```js

    weixin.auth.determine(function () {
      weixin.api.menu.get(function (error, json) {
        //json.menu
        //json.menu.button
      });
    });
    
```

#### 3. 获取自定义菜单

```js

    weixin.auth.determine(function () {
      weixin.api.menu.self(function (error, json) {
        //json.is_menu_open
        //json.selfmenu_info
        //json.selfmenu_info.button
      });
    });
    
```

#### 4. 删除菜单

```js

    weixin.auth.determine(function () {
      weixin.api.menu.remove(function (error, json) {
        //json.errcode
        //json.errmsg
      });
    });
    
```

#### 5. 更新菜单

```js
    weixin.auth.determine(function () {

      var json = {
        "button": [
          {
            "type": "view",
            "name": "我要下单",
            "url": "http://www.soso.com/"
          },
          {
            "name": "菜单",
            "sub_button": [
              {
                "type": "view",
                "name": "搜索",
                "url": "http://www.soso.com/"
              },
              {
                "type": "view",
                "name": "视频",
                "url": "http://v.qq.com/"
              },
              {
                "type": "click",
                "name": "赞一下我们",
                "key": "V1001_GOOD"
              }
            ]
          }
        ]
      };

      weixin.api.menu.create(json, function (error, json) {
        //json.errcode
        //json.errmsg
      });
    });

```

#### 6. 上传临时媒体

```js

    weixin.auth.determine(function () {
      //要上传的媒体文件
      var file = fs.realpathSync(__dirname) + '/media/image.jpg';
      weixin.api.media.temporary.create('image', file, function (error, json) {
        //json.type
        //json.media_id
        //json.created_at
      });
    });

```

#### 7. 下载临时媒体

```js
    weixin.auth.determine(function () {
      //要保存的媒体文件路径与文件名
      var path = fs.realpathSync(__dirname + '/../') + '/output/temporary.jpg';
      weixin.api.media.temporary.get(mediaId, path, function (error) {
      });
    });
```

#### 8. 上传永久媒体

```js
    weixin.auth.determine(function () {
      var file = fs.realpathSync(__dirname + '/../') + '/media/image.jpg';
      weixin.api.media.permanent.create('image', file, function (error, json) {
        //json.media_id
        //json.url
      });
    });
```

#### 9. 下载永久媒体

```js
    weixin.auth.determine(function () {
      weixin.api.media.permanent.get(mediaId, function (error, body) {
        var file = fs.realpathSync(__dirname + '/../') + '/output/permanent.jpg';
        fs.writeFileSync(file, new Buffer(body));
      });
    });
```


#### 10. 创建图文消息

```js
    weixin.auth.determine(function () {

      var json = {
        "articles": [{
          "title": 'hello',
          "thumb_media_id": mediaId,
          "author": 'author',
          "digest": 'digest',
          "show_cover_pic": 0,
          "content": 'content',
          "content_source_url": 'http://www.sina.com.cn'
        }]
      };
      weixin.api.media.permanent.news(json, function (error, json) {
        //json.media_id
      });
    });
```

#### 11. 获取媒体总数

```js
    weixin.auth.determine(function () {
      weixin.api.media.count(function (error, json) {
        //json.voice_count
        //json.video_count
        //json.image_count
        //json.news_count
      });
    });
```

#### 12. 获取媒体类型列表

```js
    weixin.auth.determine(function () {
      var type = 'image';   //Type of media
      var offset = 0;       //
      var limit = 5;        //Range from 1 ~ 20

      weixin.api.media.list(type, limit, offset, function (error, json) {
        //json.total_count
        //json.item_count
        //json.item
        //json.item[N].media_id
      });
    });
```

#### 13. 创建临时二维码

```js
    weixin.auth.determine(function () {
      //场景ID是整数
      weixin.api.qrcode.temporary.create(ID, function (error, json) {
        //json.url
        //json.expire_seconds
        //json.ticket
      });
    });
```

#### 14. 创建永久二维码

```js
    weixin.auth.determine(function () {
      //场景ID是整数
      weixin.api.qrcode.permanent.create(ID, function (error, json) {
        //json.url
        //json.ticket
      });
    });
```

#### 15. 创建永久字符二维码

```js
    weixin.auth.determine(function () {
      var STR = 'SDFSFDFD'
      weixin.api.qrcode.permanent.createString(STR, function (error, json) {
        //json.url
        //json.ticket
      });
    });
```


#### 16. 创建短链接

```js
    weixin.auth.determine(function () {
      var url = 'https://mp.weixin.qq.com/advanced/advanced?action=dev&t=advanced/dev&token=fsosofd&lang=zh_CN';
      weixin.api.url.shorten(url, function (error, json) {
        //json.short_url
        //json.errcode
        //json.errmsg
      });
    });
```

#### 17. 获取用户信息
```js
    weixin.auth.determine(function () {
      var openid = '';
      weixin.api.user.info(openid, function (error, json) {
        //json.nickname
        //json.openid
      });
    });
```

#### 18. 获取用户列表

```js
    var nextOpenId = null;
    weixin.auth.determine(function () {

      weixin.api.user.list(null, function (error, json) {
        //json.total
        //json.count
        if (json.count > 0) {
          //json.data.openid
          nextOpenId = json.next_openid;
        }
      });
    });
```

#### 19. 获取下一批用户列表

```js
      weixin.api.user.list(nextOpenId, function (error, json) {
        //json.total
        //json.count
        if (json.count > 0) {
          //json.data.openid
          nextOpenId = json.next_openid;
        }
      });
```


## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-weixin-api.svg
[npm-url]: https://npmjs.org/package/node-weixin-api
[travis-image]: https://travis-ci.org/JSSDKCN/node-weixin-api.svg?branch=master
[travis-url]: https://travis-ci.org/JSSDKCN/node-weixin-api
[daviddm-image]: https://david-dm.org/JSSDKCN/node-weixin-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/JSSDKCN/node-weixin-api
