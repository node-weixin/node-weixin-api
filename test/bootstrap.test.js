var weixin = require('../lib/index');
var config = require('./config');
weixin.init(config);

describe("Begin NodeWeixinApi testing", function () {
  require('./units/auth.spec');
  require('./units/apis.spec');
  require('./units/callbacks.spec');
  require('./units/pay.spec');
});

