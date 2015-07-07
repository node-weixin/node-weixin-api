
module.exports = {
  app: {
    appId: 'wx0201661ce8fb3e11',
    appSecret: '483585a84eacd76693855485cb88dc8a',
    appToken: 'didsosdifsofisdofisfosjfosjfsodf',
  },
  merchant: {
    id: 1345,
    key: '12344',
    ssl: {
      cert: 'doddo',
      key: 'sosos'
    }
  },
  urls: {
    js: {
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
