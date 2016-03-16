var weixin = require('../');
var assert = require('assert');

/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

describe('weixin test', function() {
  it('should pass', function() {
    var modules = [
      'user',
      'jssdk',
      'menu',
      'media',
      'pay',
      'link',
      'auth',
      'oauth',
      'message'
    ];
    for (var i = 0; i < modules.length; i++) {
      var module = modules[i];
      assert.equal(true, typeof weixin[module] === 'object');
    }
  });
});
