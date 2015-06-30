var fs = require('fs')
  , path = require('path')
  , certFile = path.resolve(__dirname, '../cert/apiclient_cert.pem')
  , keyFile = path.resolve(__dirname, '../cert/apiclient_key.pem');


module.exports = {
  app: {
    appId: 'wx0201661ce8fb3e11',
    appSecret: '483585a84eacd76693855485cb88dc8a',
    appToken: 'didsosdifsofisdofisfosjfosjfsodf',
  },
  merchant: {
    id: '123',
    key: '212',
    ssl: {
      cert: fs.readFileSync(certFile),
      key: fs.readFileSync(keyFile)
    }
  },
  jssdk: {
    apiList: [
     'onMenuShareTimeline',
     'onMenuShareAppMessage',
     'onMenuShareQQ',
     'onMenuShareWeibo',
     'startRecord',
     'stopRecord',
     'onVoiceRecordEnd',
     'playVoice',
     'pauseVoice',
     'stopVoice',
     'onVoicePlayEnd',
     'uploadVoice',
     'downloadVoice',
     'chooseImage',
     'previewImage',
     'uploadImage',
     'downloadImage',
     'translateVoice',
     'getNetworkType',
     'openLocation',
     'getLocation',
     'hideOptionMenu',
     'showOptionMenu',
     'hideMenuItems',
     'showMenuItems',
     'hideAllNonBaseMenuItem',
     'showAllNonBaseMenuItem',
     'closeWindow',
     'scanQRCode',
     'chooseWXPay',
     'openProductSpecificView',
     'addCard',
     'chooseCard',
     'openCard'
    ]
  }
};
