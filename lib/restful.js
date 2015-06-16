var request = require('request');
var fs = require("fs");

module.exports = {
  toParam: function(params) {
    var keys = [];
    for(var k in params) {
      keys.push(k + '=' + params[k]);
    }
    return keys.join('&');
  },
  toJSON: function(string) {
    try {
      return JSON.parse(string);
    } catch (e) {
      return false;
    }
  },
  request: function(url, data, cb) {
    request.post({url:url, json: true, form: data}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(false, body);
      } else {
        cb(true, {errorMessage: body});
      }
    });
  },

  json: function(url, data, cb) {
    request.post({url:url, body: data, json: true}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(false, body);
      } else {
        cb(true, {errorMessage: body});
      }
    });
  },
  file: function(url, file, cb) {
    var self = this;
    fs.stat(file, function(err, stat) {
      if (err) {
        return cb(true, {errorMessage: 'File not exist'});
      }
      var media = fs.createReadStream(file);
      request.post({
        url: url,
        json: true,
        formData: { media: media, nonce: ''}
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          cb(false, body);
        } else {
          cb(true, {errorMessage: body});
        }
      });
    });

  }
};
