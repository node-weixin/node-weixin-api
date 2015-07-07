var assert = require("assert");
var fs = require('fs');
var weixin = require('./../../index');

var validator = require('validator');

describe("Weixin apis Test", function () {

  //IP listing
  it('should be able to get an ip', function (done) {
    weixin.auth.determine(function () {
      weixin.api.ip(function (error, json) {
        assert.equal(true, json.ip_list.length > 0);
        for (var i = 0; i < json.ip_list.length; i++) {
          assert.equal(true, validator.isIP(json.ip_list[i]));
        }
        done();
      });
    });
  });


  //Menu functions

  it('should be able to get the menu', function (done) {
    weixin.auth.determine(function () {
      weixin.api.menu.get(function (error, json) {
        assert.equal(true, typeof json.menu === 'object');
        assert.equal(true, typeof json.menu.button === 'object');
        done();
      });
    });
  });

  it('should be able to get custom menu', function (done) {
    weixin.auth.determine(function () {
      weixin.api.menu.self(function (error, json) {
        assert.equal(true, json.is_menu_open === 1);
        assert.equal(true, typeof json.selfmenu_info === 'object');
        assert.equal(true, typeof json.selfmenu_info.button === 'object');
        done();
      });
    });
  });

  it('should be able to remove the menu', function (done) {
    weixin.auth.determine(function () {
      weixin.api.menu.remove(function (error, json) {
        assert.equal(true, json.errcode === 0);
        assert.equal(true, json.errmsg === 'ok');
        done();
      });
    });
  });

  it('should be able to update the menu', function (done) {
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
        assert.equal(true, json.errcode === 0);
        assert.equal(true, json.errmsg === 'ok');
        done();
      });
    });
  });

  //Media functions

  var mediaId = null, newsId = null;
  it('should be able to upload a temporary media', function (done) {
    weixin.auth.determine(function () {
      var file = fs.realpathSync(__dirname + '/../') + '/media/image.jpg';
      weixin.api.media.temporary.create('image', file, function (error, json) {
        assert.equal(true, json.type === 'image');
        assert.equal(true, typeof json.media_id === 'string');
        mediaId = json.media_id;
        assert.equal(true, validator.isNumeric(json.created_at) && !!new Date(json.created_at));
        done();
      });
    });
  });

  it('should be able to get a temporary media', function (done) {
    weixin.auth.determine(function () {
      var path = fs.realpathSync(__dirname + '/../') + '/output/temporary.jpg';
      weixin.api.media.temporary.get(mediaId, path, function (error) {
        assert(!error);
        done();
      });
    });
  });

  it('should be able to get a temporary media', function (done) {
    weixin.auth.determine(function () {
      var path = fs.realpathSync(__dirname + '/../') + '/output/temporary.jpg';
      if (fs.existsSync(path)) {
        fs.unlink(path);
      }
      weixin.api.media.temporary.get(mediaId, path, function (error) {
        assert(!error);
        assert(fs.existsSync(path));
        done();
      });
    });
  });


  it('should be able to upload a permanent media', function (done) {
    weixin.auth.determine(function () {
      var file = fs.realpathSync(__dirname + '/../') + '/media/image.jpg';
      weixin.api.media.permanent.create('image', file, function (error, json) {
        assert.equal(true, typeof json.media_id === 'string');
        mediaId = json.media_id;
        assert.equal(true, validator.isURL(json.url));
        done();
      });
    });
  });

  it('should be able to get a permanent media', function (done) {
    weixin.auth.determine(function () {
      weixin.api.media.permanent.get(mediaId, function (error, body) {
        var file = fs.realpathSync(__dirname + '/../') + '/output/permanent.jpg';
        fs.writeFileSync(file, new Buffer(body));
        done();
      });
    });
  });

  it('should be able to create a permanent news', function (done) {
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
        newsId = json.media_id;
        assert.equal(true, typeof json.media_id === 'string');
        done();
      });
    });


  });

  it('should be able to get media count', function (done) {
    weixin.auth.determine(function () {
      weixin.api.media.count(function (error, json) {
        assert.equal(true, validator.isNumeric(json.voice_count) && json.voice_count >= 0);
        assert.equal(true, validator.isNumeric(json.video_count) && json.video_count >= 0);
        assert.equal(true, validator.isNumeric(json.image_count) && json.image_count >= 0);
        assert.equal(true, validator.isNumeric(json.news_count) && json.news_count >= 0);
        done();
      });
    });
  });

  it('should be able to get media list', function (done) {
    weixin.auth.determine(function () {
      var type = 'image';   //Type of media
      var offset = 0;       //
      var limit = 5;        //Range from 1 ~ 20

      weixin.api.media.list(type, limit, offset, function (error, json) {

        assert.equal(true, validator.isNumeric(json.total_count) && json.total_count >= 0);
        assert.equal(true, validator.isNumeric(json.item_count) && json.item_count >= 0);

        for (var i = 0; i < json.item.length; i++) {
          var item = json.item[i];
          assert.equal(true, item.media_id.length > 0);
        }
        done();
      });
    });
  });


  //QRCode Functions
  it('should be able to create a temporary qrcode', function (done) {
    weixin.auth.determine(function () {
      weixin.api.qrcode.temporary.create(10, function (error, json) {
        assert.equal(true, validator.isURL(json.url));
        assert.equal(true, json.expire_seconds <= 7 * 3600 * 24);
        assert.equal(true, typeof json.ticket === 'string');
        done();
      });
    });
  });


  it('should be able to get the temporary qrcode', function (done) {
    weixin.auth.determine(function () {

      weixin.api.qrcode.temporary.create(10, function (error, json) {
        assert.equal(true, validator.isURL(json.url));
        assert.equal(true, json.expire_seconds <= 7 * 3600 * 24);
        assert.equal(true, typeof json.ticket === 'string');
        done();
      });
    });
  });

  it('should be able to create a permanent qrcode', function (done) {
    weixin.auth.determine(function () {

      weixin.api.qrcode.permanent.create(10, function (error, json) {
        assert.equal(true, validator.isURL(json.url));
        assert.equal(true, typeof json.ticket === 'string');

        done();
      });
    });
  });

  it('should be able to create a permanent string qrcode', function (done) {
    weixin.auth.determine(function () {

      weixin.api.qrcode.permanent.createString('heleoodo', function (error, json) {
        assert.equal(true, validator.isURL(json.url));
        assert.equal(true, typeof json.ticket === 'string');
        done();
      });
    });
  });

  //URL functions

  it('should be able to reduce a url string', function (done) {
    weixin.auth.determine(function () {
      var url = 'https://mp.weixin.qq.com/advanced/advanced?action=dev&t=advanced/dev&token=fsosofd&lang=zh_CN';
      weixin.api.url.shorten(url, function (error, json) {
        assert.equal(true, validator.isURL(json.short_url));
        assert.equal(true, json.errcode === 0);
        assert.equal(true, json.errmsg === 'ok');
        assert.equal(true, json.short_url.length < url.length);
        done();
      });
    });
  });

  //User functions

  var nextOpenId = null;
  it('should be able to get user info', function (done) {
    weixin.auth.determine(function () {
      var openid = 'oZ-W6swP3sNCFClGG0SF8gvRaqNM';
      weixin.api.user.info(openid, function (error, json) {
        assert.equal(true, typeof json.nickname === 'string');
        assert.equal(true, json.openid === openid);
        done();
      });
    });
  });

  it('should be able to list subscribes', function (done) {
    weixin.auth.determine(function () {

      weixin.api.user.list(null, function (error, json) {
        assert.equal(true, json.total >= 0);
        assert.equal(true, json.count >= 0);
        if (json.count > 0) {
          assert.equal(true, json.data.openid.length >= 0);
          assert.equal(true, !!json.next_openid);
          nextOpenId = json.next_openid;
        }
        done();
      });
    });
  });

  it('should be able to list subscribes from openid', function (done) {
    weixin.auth.determine(function () {

      weixin.api.user.list(nextOpenId, function (error, json) {
        assert.equal(true, json.total >= 0);
        assert.equal(true, json.count >= 0);
        if (json.count > 0) {
          assert.equal(true, json.data.openid.length >= 0);
          assert.equal(true, !!json.next_openid);
        }
        done();
      });
    });
  });

  //JSSDK Ticket retrieving

  it('should be able to signify a url', function (done) {
    weixin.auth.determine(function () {
      var url = "weixin.qq.com";
      weixin.api.jssdk.signify(url, function (error, json) {
        assert.equal(true, error === false);
        assert.equal(true, weixin.api.jssdk.passed === false);
        assert.equal(true, typeof json.jsapi_ticket === 'string');
        assert.equal(true, typeof json.noncestr === 'string');
        assert.equal(true, typeof json.timestamp === 'string');
        assert.equal(true, json.url === url);
        assert.equal(true, typeof json.signature === 'string');
        done();
      });
    });
  });

  it('should be able to signify a url without request', function (done) {
    weixin.auth.determine(function () {

      var url = "weixin.qq.com";
      weixin.api.jssdk.signify(url, function (error, json) {
        assert.equal(true, weixin.api.jssdk.passed === true);
        assert.equal(true, typeof json.jsapi_ticket === 'string');
        assert.equal(true, typeof json.noncestr === 'string');
        assert.equal(true, typeof json.timestamp === 'string');
        assert.equal(true, json.url === url);
        assert.equal(true, typeof json.signature === 'string');
        done();
      });
    });
  });

  it('should be able to prepare a json for js', function (done) {
    weixin.auth.determine(function () {

      var url = "weixin.qq.com";
      weixin.api.jssdk.prepare(function (error, json) {
        var errors = require('web-errors').errors;
        assert.equal(true, error === errors.SUCCESS);
        assert.equal(true, json.appId === weixin.config.app.appId);
        assert.equal(true, typeof json.signature === 'string');
        assert.equal(true, json.signature.length <= 64);
        assert.equal(true, typeof json.nonceStr === 'string');
        assert.equal(true, typeof json.timestamp === 'string' && validator.isNumeric(json.timestamp));
        done();
      });
    });
  });

  it('should be able to retrieving JSSDK ticket', function (done) {
    weixin.auth.determine(function () {

      weixin.api.jssdk.ticket(function (error, json) {
        assert.equal(true, json.errcode === 0);
        assert.equal(true, json.errmsg === 'ok');
        assert.equal(true, typeof json.ticket === 'string');
        assert.equal(true, json.expires_in === 7200);
        done();
      });
    });
  });

  //Token retrieving
  it('should be able to get a token', function (done) {
    weixin.auth.tokenize(function (error, json) {
      assert.equal(true, !!json.access_token && json.access_token.length > 1);
      assert.equal(true, json.expires_in === 7200);
      done();
    });
  });
});

