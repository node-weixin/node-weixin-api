var restful = require('./../restful');
var baseUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode/';

function getUrl(type) {
  return baseUrl + type + '?' + restful.toParam();
}

module.exports = {

  temporary: {
    create: function (id, cb) {
      var url = getUrl('create');
      var data = {
        expire_seconds: 604800,
        action_name: "QR_SCENE",
        action_info: {
          scene: {
            scene_id: id
          }
        }
      };
      restful.json(url, data, cb);
    }
  },
  permanent: {
    create: function (id, cb) {
      var url = getUrl('create');
      var data = {action_name: "QR_LIMIT_SCENE", action_info: {scene: {scene_id: id}}};
      restful.json(url, data, cb);
    },
    createString: function (string, cb) {
      var url = getUrl('create');
      var data = {action_name: "QR_LIMIT_STR_SCENE", action_info: {scene: {scene_str: string}}}

      restful.json(url, data, cb);
    }
  }
};
