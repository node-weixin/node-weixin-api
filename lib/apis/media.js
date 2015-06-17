var restful = require('./../restful');
var temporaryUrl = 'https://api.weixin.qq.com/cgi-bin/media/';
var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';

module.exports = {
  temporary: {
    create: function(type, file, cb) {
      var params = {
        type: type
      };
      var url = temporaryUrl + 'upload?' + restful.toParam(params);
      restful.file(url, file, cb);
    },
    get: function(mediaId, file, cb) {
      var params = {
        media_id: mediaId
      };
      var url = temporaryUrl + 'get?' + restful.toParam(params);
      restful.download(url, null, file, cb);
    }
  },
  permanent: {
    news: function(json, cb) {
      var url = permanentUrl + 'add_news?' + restful.toParam();
      restful.json(url, json, cb);
    },
    create: function(type, file, cb, description)  {
      var params = {
        type: type
      };
      switch(type) {
        case 'image':
        case 'voice':
        case 'thumb':
          break;
        case 'video':
          params.description = description;
        default :
          cb(false, {errmsg: 'Invalid type'});
          return;
      }
      var url = permanentUrl + 'add_material?' + restful.toParam(params);
      restful.file(url, file, cb);
    },

    get: function(mediaId, cb) {
      var params = {
        media_id: mediaId
      };
      var url = permanentUrl + 'get_material?' + restful.toParam(params);
      restful.request(url, null, cb);
    },
    remove: function() {

    },
    update: function() {

    }
  },
  all: function() {

  },
  list: function() {

  },

};
