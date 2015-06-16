var assert = require("assert");
var config = require('./../config');
var weixin = require('./../../index');

var validator = require('validator');

var accessToken = null;
describe("Weixin apis Test", function () {

  //Token retrieving
  it('should be able to get a token', function (done) {
    weixin.api.tokenize(function (error, json) {
      assert.equal(true, !!json.access_token && json.access_token.length > 1);
      assert.equal(true, json.expires_in === 7200);
      done();
    });
  });


  //Menu functions

  it('should be able to get the menu', function (done) {
    weixin.api.menu.get(function (error, json) {
      assert.equal(true, typeof json.menu === 'object');
      assert.equal(true, typeof json.menu.button === 'object');
      done();
    });
  });

  it('should be able to get custom menu', function (done) {
    weixin.api.menu.self(function (error, json) {
      assert.equal(true, json.is_menu_open === 1);
      assert.equal(true, typeof json.selfmenu_info === 'object');
      assert.equal(true, typeof json.selfmenu_info.button === 'object');
      done();
    });
  });

  it('should be able to remove the menu', function (done) {
    weixin.api.menu.remove(function (error, json) {
      assert.equal(true, json.errcode === 0);
      assert.equal(true, json.errmsg === 'ok');
      done();
    });
  });

  it('should be able to update the menu', function (done) {
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
      assert.equal(true, json.errcode === 0);
      assert.equal(true, json.errmsg === 'ok');
      done();
    });
  });

});

