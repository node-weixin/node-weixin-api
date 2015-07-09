module.exports = {
  app: {
    appId: '',
    appSecret: '',
    appToken: ''
  },
  merchant: {
    id: null,
    key: '',
    ssl: {
      cert: null,
      key: null
    }
  },
  urls: {
    js: {
      main: ''
    },
    oauth: {
      //用户首次访问的URL地址
      init: '',
      //用户通过验证后的返回地址
      redirect: 'http://redirect.domain.com/',
      //成功获取用户openid后的地址
      success: ''
    }
  }
};