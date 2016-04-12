# node-weixin-api 

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Beerpay](https://beerpay.io/node-weixin/node-weixin-api/badge.svg?style=flat-square)](https://beerpay.io/node-weixin/node-weixin-api)

# 基于nodejs的微信公共平台API的SDK

目标是实现一个

1. 模块化、组件化、代码简洁、低耦合
2. 可以使用单独的模块
3. 也可以很方便的组合起来使用
4. 有清晰的架构组织，
5. 良好的协作模式
6. 支持服务器的规模化（Scalable)
7. 支持全面的API

的第三方微信API的node微信实现。方便开发者讯速构建微信服务。

## 帮助与交流

交流QQ群: 39287176
交流论坛： [http://forum.node-weixin.com/](http://forum.node-weixin.com/)

> 将会优先解答论坛问题，欢迎提问。


## 组成

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

 12. [node-weixin-message](https://github.com/node-weixin/node-weixin-message)
    微信消息处理模块

## 集成的模块有：

  [weixin.auth](https://github.com/node-weixin/node-weixin-auth)

  [weixin.oauth](https://github.com/node-weixin/node-weixin-oauth)

  [weixin.user](https://github.com/node-weixin/node-weixin-user)

  [weixin.pay](https://github.com/node-weixin/node-weixin-pay)

  [weixin.jssdk](https://github.com/node-weixin/node-weixin-jssdk)

  [weixin.menu](https://github.com/node-weixin/node-weixin-menu)

  [weixin.media](https://github.com/node-weixin/node-weixin-media)

  [weixin.link](https://github.com/node-weixin/node-weixin-link)

  [weixin.message](https://github.com/node-weixin/node-weixin-message)

## 安装

```sh
$ npm install --save node-weixin-api
```

## 使用

请参考各API的README文件指导与测试用例。
> 所有示例以测试用例代码为准。


## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-api.svg
[npm-url]: https://npmjs.org/package/node-weixin-api
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-api.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-api
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-api
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-api/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-api
