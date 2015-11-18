#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Weixin API for node

===========

微信公共平台API

由于现有的node weixin api接口做的比较麻烦，不利于书写与理解．故重新书写代码，架构．
让开发者更容易理解与使用，并且帮助提升软件质量

交流QQ群: 39287176

[node-weixin-api](https://github.com/node-weixin/node-weixin-api)是基于node-weixin-*的API接口的SDK。

 它们都是由下列子项目组合而成, node-weixin-api只是将业务接口统一到一个api里方便调用，而不必一个一个重新安装:

 1. [node-weixin-config](https://github.com/node-weixin/node-weixin-config)
    用于微信配置信息的校验

 2. [node-weixin-auth](https://github.com/node-weixin/node-weixin-auth)
    用于与微信服务器握手检验

 3. [node-weixin-util](https://github.com/node-weixin/node-weixin-util)
    一些常用的微信请求，加密，解密，检验的功能与处理

 4. [node-weixin-request](https://github.com/node-weixin/node-weixin-request)
    微信的各类服务的HTTP请求的抽象集合

 5. [node-weixin-oauth](https://github.com/node-weixin/node-weixin-oauth)
    微信OAuth相关的操作

 6. [node-weixin-pay](https://github.com/node-weixin/node-weixin-pay)
    微信支付的服务器接口

 7. [node-weixin-jssdk](https://github.com/node-weixin/node-weixin-jssdk)
    微信JSSDK相关的服务器接口

 8. [node-weixin-menu](https://github.com/node-weixin/node-weixin-menu)
    微信菜单相关的操作与命令

 9. [node-weixin-media](https://github.com/node-weixin/node-weixin-media)
    微信多媒体相关的操作
    
 10. [node-weixin-user](https://github.com/node-weixin/node-weixin-user)
    微信用户相关的操作与命令

 11. [node-weixin-link](https://github.com/node-weixin/node-weixin-link)
    微信推广相关的操作
    
## 集成的模块有：

  [weixin.auth](https://github.com/node-weixin/node-weixin-auth)
  
  [weixin.oauth](https://github.com/node-weixin/node-weixin-oauth)
  
  [weixin.user](https://github.com/node-weixin/node-weixin-user)
  
  [weixin.pay](https://github.com/node-weixin/node-weixin-pay)
  
  [weixin.jssdk](https://github.com/node-weixin/node-weixin-jssdk)
  
  [weixin.menu](https://github.com/node-weixin/node-weixin-menu)
  
  [weixin.media](https://github.com/node-weixin/node-weixin-media)
  
  [weixin.link](https://github.com/node-weixin/node-weixin-link)
  
  
## 安装

```sh
$ npm install --save node-weixin-api
```

## 使用


```js
var api = require("node-weixin-api");



// App信息是基本的配置信息
var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};

var config = require("node-weixin-config");
config.app.init(app);

///api.auth直接使用即可, api里的对象直接根本api调用即可。

api.user.list(app, api.auth, null, function (error, data) {
});
```


## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-weixin-api.svg
[npm-url]: https://npmjs.org/package/node-weixin-api
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-api.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-api
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-api
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-api/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/node-weixin/node-weixin-api?branch=master
