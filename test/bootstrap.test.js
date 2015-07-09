var weixin = require('../lib/index');
var config = null;
var fs = require('fs');
var path = require('path');

if (fs.existsSync(path.resolve(__dirname, './private/app.js'))) {
  config = require('./private/app');
} else {
  config = {
    app: {
      appId: process.env.APP_ID,
      appSecret: process.env.APP_SECRET,
      appToken: process.env.APP_TOKEN
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
}

weixin.init(config);

describe("Begin NodeWeixinApi testing", function () {
  require('./units/auth.spec');
  require('./units/apis.spec');
  require('./units/callbacks.spec');
  require('./units/pay.spec');
});

