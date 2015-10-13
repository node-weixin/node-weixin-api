var weixin = require('../');
var assert = require('assert');

describe("weixin test", function () {

  var modules = [
    'user',
    'jssdk',
    'menu',
    'media',
    'pay',
    'link',
    'auth',
    'oauth'
  ]
  for(var module in weixin) {
    assert.equal(true, module in modules);
    assert.equal(true, typeof weixin[module] === 'object');
  }
});

