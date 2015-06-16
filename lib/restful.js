var request = require('request');

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
    var self = this;
    request.post({url:url, form: data}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(false, self.toJSON(body));
      } else {
        cb(true, {errorMessage: body});
      }
    });
  },

  json: function(url, data, cb) {
    var self = this;
    request.post({url:url, body: data, json: true}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(false, body);
      } else {
        cb(true, {errorMessage: body});
      }
    });
  }
};
